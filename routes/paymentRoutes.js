const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { getCart } = require('../controllers/paymentController');
router.use(cookieParser());

router.get('/getCart/:id', getCart);

module.exports = router