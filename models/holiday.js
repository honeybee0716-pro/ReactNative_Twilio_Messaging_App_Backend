const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HolidaySchema = new Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
    },
    location_id: String,
    title: String,
    description: String,
    date: String,
  },
  {
    timestamps: { created_at: 'createdAt', updated_at: 'updatedAt' },
  }
);

const Holiday = mongoose.model('holiday', HolidaySchema);

module.exports = Holiday;
