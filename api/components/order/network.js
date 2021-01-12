const express = require('express');

const router = express.Router();

const Controller = require('./index');
const response = require('../../../network/response');

router.post('/', create);
router.get('/', list);
router.get('/:id', get);
router.put('/:id', update);
router.post('/:id/deliver', deliver);

function deliver(req, res, next) {
  Controller.deliverOrder(req.params.id)
    .then((order) => {
      response.success(req, res, order, 201);
    })
    .catch(next);
}

function create(req, res, next) {
  Controller.create(req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function list(req, res, next) {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((order) => {
      response.success(req, res, order, 200);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.params.id, req.body)
    .then((order) => {
      response.success(req, res, order, 200);
    })
    .catch(next);
}

module.exports = router;
