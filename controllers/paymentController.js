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
async function handlePayment(req, res) {
    try {
        const { cartItems } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cartItems.map((p) => {
                return {
                    name: p.name,
                    description: p.description,
                    amount: p.price * 100,
                    currency: "inr",
                    quantity: p.quantity,
                };
            }),
            mode: "payment",
            success_url:
                req.protocol + "://" + req.get("host") + "/checkout/success",
            cancel_url:
                req.protocol + "://" + req.get("host") + "/checkout/cancel",
        });
        return res.send({ id: session.id, response: "Payment in Progress" });
    }
    catch (e) {
        console.log(e);
        return res.send({response: "Internal Error!"});
    }
};

module.exports = {
    getCart,
    handlePayment
}