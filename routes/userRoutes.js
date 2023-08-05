const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const { addUser, handleLogin } = require('../controllers/userController');

router.post('/register', addUser);
router.post('/login', handleLogin);
router.get('/', (req, res) => {
    res.send("Routes Working!"); 
});

module.exports = router;