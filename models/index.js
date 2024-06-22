const { User } = require('./userModel');
const { Product } = require('./productModel');
const { Order } = require('./orderModel');
const { Webhook } = require('./webhookModel');

const models = {
  User,
  Product,
  Order,
  Webhook,
};

global.models = models;

module.exports = models;