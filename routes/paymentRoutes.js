const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { getCart, handlePayment, setCart } = require('../controllers/paymentController');
router.use(cookieParser());


router.get('/getCart/:id', getCart);
router.post('/create-checkout-session', handlePayment);
router.post('/setCart', setCart);
module.exports = router