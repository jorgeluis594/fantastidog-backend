const TABLE = 'Delivery';

module.exports = (injectedStore) => {
  function list() {
    return injectedStore.list(TABLE);
  }

  function get(id) {
    return injectedStore.get(TABLE, id);
  }

  function create(data) {
    return injectedStore.insert(TABLE, data);
  }

  function update(id, data) {
    return injectedStore.update(TABLE, id, data);
  }

  function getDeliveriesActives() {
    return injectedStore.query(TABLE, { status: 1 });
  }

  return {
    list,
    get,
    create,
    update,
    getDeliveriesActives,
  };
};
