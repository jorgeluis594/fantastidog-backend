const express = require('express');

const Controller = require('./index');
const response = require('../../../network/response');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', create);
router.put('/:id', update);

function list(req, res, next) {
  Controller.list()
    .then((deliveryList) => {
      response.success(req, res, deliveryList, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((delivery) => {
      response.success(req, res, delivery, 200);
    })
    .catch(next);
}

function create(req, res, next) {
  Controller.create(req.body)
    .then((delivery) => {
      response.success(req, res, delivery, 200);
    })
    .catch(next);
}

function update(req, res, next) {
  Controller.update(req.params.id, req.body)
    .then((delivery) => {
      response.success(req, res, delivery, 200);
    })
    .catch(next);
}

module.exports = router;
