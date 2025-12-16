const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  validity: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['prepaid', 'postpaid'],
    required: true
  },
  operator: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);