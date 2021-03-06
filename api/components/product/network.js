/* eslint-disable no-use-before-define */
const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', create);
router.put('/:id', update);

function list(req, res, next) {
  Controller.list()
    .then((productList) => {
      response.success(req, res, productList, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((product) => {
      response.success(req, res, product, 200);
    })
    .catch(next);
}

function create(req, res, next) {
  Controller.create(req.body)
    .then((product) => {
      response.success(req, res, product, 201);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.params.id, req.body)
    .then((product) => {
      response.success(req, res, product, 200);
    })
    .catch(next);
}
module.exports = router;
