const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const err = require('../../../utils/errors');

const TABLE = 'auth';

module.exports = (injectedStore) => {
  async function find(query) {
    return injectedStore.query(TABLE, query)[0];
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

  async function create(data) {
    const cryptPassword = await bcrypt.hash(data.password, 5);
    await injectedStore.insert(TABLE, { ...data, password: cryptPassword });
  }

  async function update(id, data) {
    const cryptPassword = await bcrypt.hash(data.password, 5);
    await injectedStore.update(TABLE, id, { ...data, password: cryptPassword });
  }

  return {
    login,
    find,
    create,
    update,
  };
};
