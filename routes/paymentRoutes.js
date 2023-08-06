const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { getCart, handlePayment } = require('../controllers/paymentController');
router.use(cookieParser());


router.get('/getCart/:id', getCart);
router.post("/create-checkout-session", handlePayment);

module.exports = router