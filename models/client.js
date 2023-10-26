const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    hash: String,
    salt: String,
    isActive: { type: Boolean, default: false },
    avatar: String,
  },
  {
    timestamps: { created_at: 'createdAt', updated_at: 'updatedAt' },
  }
);

const Client = mongoose.model('client', ClientSchema);

module.exports = Client;
