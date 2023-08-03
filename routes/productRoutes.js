const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser);

router.get('/', (req, res) => {
    res.send("product routes are online");
}); 

module.exports = router;