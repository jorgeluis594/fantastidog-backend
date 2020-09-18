/* eslint-disable no-use-before-define */
const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.post('/', upsert);

function list(req, res, next) {
  Controller.list()
    .then((productList) => {
      response.success(req, res, productList, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  const productData = req.body;

  if (req.params.id) productData.id = req.params.id;

  Controller.upsert(productData)
    .then((product) => {
      response.success(req, res, product, 201);
    })
    .catch(next);
}
module.exports = router;
