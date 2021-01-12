/* eslint-disable no-use-before-define */
const err = require('../../../utils/errors');

function validAttributes(product) {
  const isStringsArray = () => !product.attributes.some((attribute) => typeof attribute !== 'string');
  return Array.isArray(product.attributes) && isStringsArray();
}

module.exports = (injectedStore) => {
  function list() {
    return injectedStore.list();
  }

  async function get(id) {
    const product = await injectedStore.get(id);
    if (!product) throw err('Product not found', 404);
    return product;
  }

  async function create(data) {
    if (!validAttributes(data)) {
      throw err('Invalid data', 400);
    }
    return injectedStore.create(data);
  }

  function update(id, data) {
    return injectedStore.update(id, data);
  }

  return {
    create,
    list,
    get,
    update,
  };
};
