const express = require('express');
const router = express.Router();
const { handleRefresh } = require('../controllers/refreshController');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/', handleRefresh); 

module.exports = router