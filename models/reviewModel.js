const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  reviewId: {
    type: String,
    required: true,
  },
  reviewerName: {
    type: String,
    required: true
  },
  userId: {
    type: String,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
  },
  productId: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },

});
module.exports = { Review: mongoose.model('Review', reviewSchema) }; 
