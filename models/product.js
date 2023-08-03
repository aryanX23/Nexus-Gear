const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        reuired: true
    },
    price: {
        type: Number,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    }
});
const Products = mongoose.model('Products', productSchema); 
module.exports = {
    Products
}