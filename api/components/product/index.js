const ctrl = require('./controller');
// const store = require('../../../store/mysql');
const store = require('./store');

module.exports = ctrl(store);
