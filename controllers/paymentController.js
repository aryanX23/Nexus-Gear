const Users = require('../models/userModel');

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

module.exports = {
    getCart
}