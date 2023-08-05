const Products = require('../models/product');

async function addProducts(req, res) {
    try {
        const { name, description, price, imageurl, tag } = req.body;
        const product = new Products({ name, description, price, imageurl, tag });
        await product.save();
        res.send("Product added successfully!!");
    }
    catch (e) {
        console.log(e);
        res.send("Internal Error!");
    }
}
async function getProducts(req, res) {
    try {
        const tag = req.params.tag;
        if (tag == "all") {
            const products = await Products.find();
            res.send(products);
            return;
        }
        else {
            const products = await Products.find({tag});
            res.send(products);
            return;
        }
    }
    catch (e) {
        console.log(e);
        res.send([]);
    }
}
async function getDetails(req, res) {
    try {
        const { productId } = req.body;
        const product = await Products.findOne({ _id: productId });
        res.send({
            response: "success",
            name: product.name,
            description: product.description,
            price: product.price,
            imageurl: product.imageurl,
            tag: product.tag
        });
    }
    catch (e) {
        console.log(e);
        res.send({respose:"error"});
    }
}

module.exports = {
    addProducts,
    getProducts,
    getDetails
}