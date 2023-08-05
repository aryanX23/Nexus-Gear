const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const { handleLogout } = require('../controllers/logoutController');
router.use(cookieParser());

router.get('/',handleLogout);

module.exports = router