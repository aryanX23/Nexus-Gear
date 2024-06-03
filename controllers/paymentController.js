const { STRIPE_SECRET_KEY, PAYMENT_SUCCESS_URL } = process.env || {};

const stripe = require('stripe')(STRIPE_SECRET_KEY);
const { isEmpty } = require('lodash');

const { User, Order } = require('../models');
const { errorHandler } = require('../utils/errorHandler');
const { getId } = require('../utils/generateId');


async function getCart(req, res, next) {
    try {
        const userId = req.params.id || "";

        if (isEmpty(userId)) {
            throw {
                code: "MISSING_ARGUMENTS",
                message: "User Id is Missing"
            };
        }

        const userDetails = await User.findOne({ _id: userId }).lean() || {};

        if (isEmpty(userDetails)) {
            throw {
                code: "INVALID_ARGUMENTS",
                message: "User Not Found",
            };
        }

        const { cartItems = [], previousOrders = [] } = userDetails;

        return res.send({
            cartItems,
            previousOrders,
            status: "success"
        });
    }
    catch (e) {
        errorHandler(req, res, e);
    }
}

async function setCart(req, res) {
    try {
        const { userId = '', cartItems = [] } = req.body;

        if (isEmpty(userId)) {
            throw {
                code: "MISSING_ARGUMENTS",
                message: "User Id is Missing"
            };
        }

        const userDetails = await User.findOne({ _id: userId }).lean() || {};

        if (isEmpty(userDetails)) {
            throw {
                code: "RESTRICTED_ACCESS",
                message: "User does not exists"
            };
        }

        await User.findOneAndUpdate(
            { userId },
            { cartItems }
        );

        return res.send({ status: "success", response: "Data Added successfully", data });
    } catch (e) {
        errorHandler(req, res, e);
    }
}

async function handlePayment(req, res) {
    try {
        const { cartItems = [], email = '', userId = '' } = req.body;

        if (isEmpty(userId) || isEmpty(email)) {
            throw {
                code: "MISSING_ARGUMENTS",
                message: "User Id or Email is Missing"
            };
        }

        if (cartItems.length === 0) {
            throw {
                code: "INVALID_ARGUMENTS",
                message: "Cart is Empty"
            };
        }

        const formattedCartItems = cartItems.map((item) => ({
            quantity: item.quantity,
            price_data: {
                currency: "inr",
                unit_amount: item.price * 100,
                product_data: {
                    description: item.description,
                    name: item.name,
                    images: [item.imageurl],
                },
            },
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: formattedCartItems,
            success_url: `${PAYMENT_SUCCESS_URL}/#/checkout/success`,
            cancel_url: `${PAYMENT_SUCCESS_URL}/#/checkout/cancel`,
        });

        const currency = "INR";
        let amount = 0;

        for (var i = 0; i < cartItems.length; i++) {
            amount += cartItems[i].price;
        }

        const orderId = await createOrderInDb({ email, userId, currency, amount, cartItems });

        return res.send({ id: session.id, url: session.url, response: "Payment in Progress", orderId });
    }
    catch (e) {
        errorHandler(req, res, error);
    }
};

async function createOrderInDb(payload) {
    try {
        const { email, userId, currency, amount, cartItems } = payload;

        const orderId = getId("ORDER");

        await Order.create({
            email,
            userId,
            currency,
            amount: round(amount, 2),
            products: cartItems,
            orderId,
            status: "initiated",
        });
        
        return orderId;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCart,
    handlePayment,
    setCart
}