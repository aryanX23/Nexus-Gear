const { User } = require('./userModel');
const { Product } = require('./productModel');
const { Order } = require('./orderModel');

const models = {
  User,
  Product,
  Order,
};

global.models = models;

module.exports = models;