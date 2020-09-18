const auth = require('../auth/index');

const TABLE = 'User';

// eslint-disable-next-line global-require
module.exports = (injectedStore = require('../../../store/dummy')) => {
  function list() {
    return injectedStore.list(TABLE);
  }

  function get(id) {
    return injectedStore.get(TABLE, id);
  }

  function update(id, data) {
    return injectedStore.update(TABLE, id, data);
  }

  async function create(data) {
    const { username, password, name } = data;
    const user = await injectedStore.insert(TABLE, { name, username });
    await auth.insert({ username, password });
    return user;
  }

  // delete
  async function upsert(body) {
    // eslint-disable-next-line object-curly-newline
    const { username, id, password, name } = body;
    const user = await injectedStore.upsert(TABLE, { id, name, username });
    const userAuth = await auth.find({ user_id: id });
    if (password || username) {
      const dataSet = {
        username,
        password,
      };
      if (userAuth) dataSet.id = userAuth.id;
      if (!userAuth) dataSet.user_id = id;
      await auth.upsert(dataSet);
    }

    return user;
  }
  return {
    list,
    get,
    upsert,
  };
};
