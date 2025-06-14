const mongoose = require('mongoose');
const webhookSchema = mongoose.Schema({
  webhookId: {
    type: String,
    required: true,
  },
  webhookData: Object,
  status: {
    type: String,
    default: "pending",
  }
});
module.exports = { Webhook: mongoose.model('Webhooks', webhookSchema) }; 
