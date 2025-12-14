const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Plan type is required'],
    enum: ['prepaid', 'postpaid']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [1, 'Price must be greater than 0']
  },
  validity: {
    type: String,
    required: [true, 'Validity is required']
  },
  data: {
    type: String,
    required: [true, 'Data allowance is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);