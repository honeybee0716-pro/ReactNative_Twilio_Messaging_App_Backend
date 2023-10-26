const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SMSSchema = new Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
    },
    customer_id: String,
    message: String,
    send_time: String,
    receive_time: String,
    status: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const SMS = mongoose.model('sms', SMSSchema);

module.exports = SMS;
