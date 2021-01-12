const auth = require('../auth/index');

const TABLE = 'User';

// eslint-disable-next-line global-require
module.exports = (injectedStore) => {
  function list() {
    return injectedStore.list(TABLE);
  }

  function get(id) {
    return injectedStore.get(TABLE, id);
  }

  async function update(id, data) {
    const { username, password, ...userData } = data;
    if (username || password) {
      const authData = {};
      const userAuth = await auth.find({ user_id: id });
      if (username) authData.username = username;
      if (password) authData.password = password;
      await auth.update(userAuth.id, authData);
    }
    return injectedStore.update(TABLE, id, { username, ...userData });
  }

  async function create(data) {
    const { username, password, name } = data;
    const user = await injectedStore.insert(TABLE, { name, username });
    await auth.create({ username, password, user_id: user.id });
    return user;
  }

  return {
    list,
    get,
    create,
    update,
  };
};
