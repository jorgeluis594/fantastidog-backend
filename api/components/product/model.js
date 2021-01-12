const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  active: { type: Boolean, required: true, default: true },
  attributes: { type: Array, required: true },
});

module.exports = mongoose.model('Product', productSchema);
