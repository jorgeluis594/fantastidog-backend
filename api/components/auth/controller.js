const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const err = require('../../../utils/errors');

const TABLE = 'auth';

module.exports = (injectedStore) => {
  function find(query) {
    return injectedStore.query(TABLE, query);
  }

  async function login(username, password) {
    // eslint-disable-next-line global-require
    const userController = require('../user');
    const authData = await find({ username });
    const areIquals = await bcrypt.compare(password, authData.password);
    if (areIquals) {
      const user = await userController.get(authData.user_id);
      return auth.sign(user);
    }
    throw err('Invalid information', 401);
  }

  async function upsert(data) {
    const { password, ...authData } = data;

    if (data.password) authData.password = await bcrypt.hash(password, 5);

    return injectedStore.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
    find,
  };
};
