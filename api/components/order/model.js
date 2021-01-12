const mongoose = require('mongoose');

const { Schema } = mongoose;

const attributeSchema = new Schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  attributes: [attributeSchema],
});

const deliverySchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
});

const orderSchema = new Schema({
  pet: { type: String, required: [true, 'pet must exists'] },
  owner: { type: String, required: [true, 'owenr must exists'] },
  address: String,
  phone: Number,
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date, required: true },
  payments: [Number],
  social: { type: String, required: [true, 'social must exists'] },
  delivery: { type: deliverySchema, required: true },
  products: [productSchema],
  state: { type: String, required: false, default: 'not payed' },
});

module.exports = mongoose.model('Order', orderSchema);
