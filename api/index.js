const express = require('express');

const cors = require('cors');
const config = require('../config');

const auth = require('./components/auth/network');
const user = require('./components/user/network');
const product = require('./components/product/network');
const delivery = require('./components/delivery/network');
const order = require('./components/order/network');

const errors = require('../network/errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(cors());
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/products', product);
app.use('/api/v1/deliveries', delivery);
app.use('/api/v1/orders', order);
//

app.use(errors);

require('../store/mongodb');

app.listen(config.api.port, () => {
  // eslint-disable-next-line no-console
  console.log('Api listening on the ', config.api.port, ' port');
});
