const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
    },
    location_id: String,
    firstName: String,
    lastName: String,
    // home_anniversary: String,
    email: String,
    phone: String,
    birthday: String,
    segment: String,
    tag: String,
  },
  {
    timestamps: { created_at: 'createdAt', updated_at: 'updatedAt' },
  }
);

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;
