const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
    },
    products: {
      type: Array,
    },
    status: {
      type: String,
      trim: true,
      enum: ["initiated", "completed", "failed"],
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

module.exports = { Order: mongoose.model("Order", orderSchema) };
