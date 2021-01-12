const Product = require('./model');

function create(data) {
  return Product.create(data);
}

function list() {
  return Product.find({ active: true });
}

function get(id) {
  return Product.findById(id);
}

function query(params) {
  return Product.find(params);
}

function update(id, data) {
  return Product.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  create,
  list,
  query,
  get,
  update,
};
