const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
    },
    previousOrders: {
      type: Array,
    },
    role: {
      type: String,
      trim: true,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = { User: mongoose.model("User", userSchema) };
