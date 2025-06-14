const { User } = require("./userModel");
const { Product } = require("./productModel");
const { Order } = require("./orderModel");
const { Webhook } = require("./webhookModel");
const { Review } = require("./reviewModel");

const models = {
  User,
  Product,
  Order,
  Webhook,
  Review,
};

global.models = models;

module.exports = models;
