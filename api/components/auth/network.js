const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  Controller.login(username, password)
    .then((token) => {
      response.success(req, res, token, 200);
    })
    .catch(next);
});

module.exports = router;
