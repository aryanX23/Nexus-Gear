const Users = require('../models/userModel');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function getCart(req, res, next) {
    try {
        const userId = req.params.id;
        const user = await Users.findOne({ _id: userId });
        if (!user) {
            return res.send({
                cartItems: [],
                previousOrders: []
            });
        }
        const cartItems = user.cartitems;
        const previousOrders = user.previousorders;
        return res.send({
            cartItems: cartItems,
            previousOrders: previousOrders,
        });
    }
    catch (e) {
        console.log(e);
        return res.send([]);
    }
}
async function setCart(req, res) {
    try {
        const { userId, cartItems } = req.body;
        if (userId === "temp")
            return res.sendStatus(400);
        const user = await Users.findOne({ _id: userId });
        if (!user) {
            return res.send({
                cartItems: [],
                previousOrders: [],
            });
        }
        await Users.findOneAndUpdate(
            { _id: userId },
            { cartitems: cartItems }
        );
        return res.send({ response: "Working", data: user.cartitems });
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}
async function handlePayment(req, res) {
    try {
        const { cartItems } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cartItems.map((item) => ({
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
            })),
            success_url: "http://localhost:8080" + "/#/checkout/success",
            cancel_url: "http://localhost:8080" + "/#/checkout/cancel",
        });
        return res.send({ id: session.id, url:session.url, response: "Payment in Progress" });
    }
    catch (e) {
        console.log(e);
        return res.send({response: "Internal Error!"});
    }
};

module.exports = {
    getCart,
    handlePayment,
    setCart
}