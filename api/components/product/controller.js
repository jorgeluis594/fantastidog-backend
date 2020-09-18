/* eslint-disable no-use-before-define */
const err = require('../../../utils/errors');

const TABLE = 'Product';

function validAttributes(attributes) {
  const isStringsArray = () => !attributes.some((attribute) => typeof attribute !== 'string');
  return Array.isArray(attributes) && isStringsArray();
}

module.exports = (injectedStore) => {
  function list() {
    return injectedStore.list(TABLE);
  }

  function get(id) {
    return injectedStore.get(TABLE, id);
  }

  async function upsert(data) {
    const { attributes, ...productData } = data;
    if (validAttributes(attributes)) {
      const product = await injectedStore.upsert(TABLE, productData);
      await signUpAttributes(product, attributes);
      return product;
    }
    throw err('Invalid data', 400);
  }

  function signUpAttributes(product, attributes) {
    const setData = attributes.map((attribute) => (
      {
        product_id: product.id,
        name: attribute,
      }
    ));
    return injectedStore.upsert(`${TABLE}_Attribute`, setData);
  }

  return {
    upsert,
    list,
    get,
  };
};
