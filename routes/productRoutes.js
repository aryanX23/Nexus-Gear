const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const { addProducts, getProducts, getDetails } = require('../controllers/productController');

router.post("/addProducts", addProducts);
router.post("/productDetails", getDetails);
router.get("/:tag", getProducts); 
router.get("/", (req, res) => {
    res.send([]);
});
module.exports = router;