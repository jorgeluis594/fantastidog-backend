const Order = require('./model');

function create(data) {
  return Order.create(data);
}

function list() {
  return Order.find({ state: { $ne: 'gave' } }, { products: 0 }).sort({ deliveryDate: 1 });
}

function get(id) {
  return Order.findById(id);
}

function query(params) {
  return Order.find(params);
}

function update(id, data) {
  return Order.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  create,
  list,
  query,
  get,
  update,
};
