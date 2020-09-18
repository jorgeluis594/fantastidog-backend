const express = require('express');

const config = require('../config');
const auth = require('./components/auth/network');
const user = require('./components/user/network');
const product = require('./components/product/network');
const errors = require('../network/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/products', product);
//

app.use(errors);

app.listen(config.api.port, () => {
  // eslint-disable-next-line no-console
  console.log('Api listening on the ', config.api.port, ' port');
});
