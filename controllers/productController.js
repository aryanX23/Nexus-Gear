const { isEmpty } = require('lodash');

const { Product, User } = require('../models');
const { errorHandler } = require('../utils/errorHandler');

async function addProducts(req, res) {
    try {
        const { name = '', description = '', price = '', imageurl = '', tag = '', userId = '' } = req.body;

        if (isEmpty(name) || isEmpty(description) || isEmpty(price) || isEmpty(imageurl) || isEmpty(tag) || isEmpty(userId)) {
            throw {
                code: "MISSING_ARGUMENTS",
                message: "UserId, Name, Description, Price, Image Url or Tag is Missing"
            };
        }

        const userDetails = await User.findOne({ userId }).lean() || {};

        if (isEmpty(userDetails)) {
            throw {
                code: "INVALID_ARGUMENTS",
                message: "Admin does not exist!"
            };
        }

        const { role } = userDetails;

        if (!['admin'].includes(role)) {
            throw {
                code: "UNAUTHORIZED_USER",
                message: "Not Allowed!"
            };
        }

        await Product.create({ name, description, price, imageurl, tag });

        res.send({ message: "Product added successfully!!", status: "success" });
    }
    catch (e) {
        errorHandler(req, res, e);
    }
}

async function getProducts(req, res) {
    try {
        const tag = req.params.tag || "";

        if (isEmpty(tag)) {
            throw {
                code: "MISSING_ARGUMENTS",
                message: "Tag is Missing"
            };
        }

        if (tag == "all") {
            const products = await Product.find().lean() || [];
            return res.status(200).send({data:products, status: "success"});
        }
        else {
            const products = await Product.find({ tag }).lean() || [];
            return res.status(200).send({ data: products, status: "success" });
        }
    }
    catch (e) {
        errorHandler(req, res, e);
    }
}

async function getDetails(req, res) {
    try {
        const { productId = '' } = req.body;

        if (isEmpty(productId)) {
            throw {
                code: "MISSING_ARGUMENTS",
                message: "Product Id is Missing"
            };
        }

        const productDetails = await Product.findOne({ _id: productId }).lean() || {};

        if (isEmpty(productDetails)) {
            throw {
                code: "INVALID_ARGUMENTS",
                message: "Product Id does not exists",
            };
        }

        const { name = '', description = '', price = '', imageurl = '', tag = '' } = productDetails;

        res.send({
            status: "success",
            name,
            description,
            price,
            imageurl,
            tag
        });
    }
    catch (e) {
        errorHandler(req, res, e);
    }
}

module.exports = {
    addProducts,
    getProducts,
    getDetails
}