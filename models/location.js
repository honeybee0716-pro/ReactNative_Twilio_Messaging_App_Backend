const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema(
  {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country : String
  },
  {
    timestamps: { created_at: 'createdAt', updated_at: 'updatedAt' },
  }
);

const Location = mongoose.model('location', LocationSchema);

module.exports = Location;
