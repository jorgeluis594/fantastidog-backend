const err = require('../../../utils/errors');
const Product = require('../product');
const Social = require('../social');
const Delivery = require('../delivery');
const { isTodayOrGreather } = require('../../../utils/date');

module.exports = (injectedStore) => {
  async function create(order) {
    await validOrder(order);
    return injectedStore.create(order);
  }

  function list() {
    return injectedStore.list();
  }

  function get(id) {
    return injectedStore.get(id);
  }

  async function update(id, data) {
    await AddPay(id, data);
    return injectedStore.update(id, data);
  }

  async function deliverOrder(id) {
    const order = await get(id);
    if (!isTodayOrGreather(order.deliveryDate)) throw err("Today isn't delivery day", 400);
    return injectedStore.update(id, { state: 'gave' });
  }

  // Utils
  async function validOrder(order) {
    await validProducts(order);
    await validSocial(order);
    await validDelivery(order);
  }

  async function validDelivery(order) {
    const deliveries = (await Delivery.getDeliveriesActives()).map((delivery) => delivery.name);
    if (!deliveries.includes(order.delivery.name)) {
      throw err(`Delivery ${order.delivery.name} not found`, 400);
    }
  }

  async function validSocial(order) {
    const socials = await Social.list();
    if (!socials.includes(order.social)) {
      throw err(`Social ${order.social} invalid`, 400);
    }
  }

  async function validProducts(order) {
    const products = (await Product.list()).map((product) => product.name);
    order.products.forEach((product) => {
      if (!products.includes(product.name)) {
        throw err(`Product ${product.name} not found`, 400);
      }
    });
  }

  async function AddPay(id, data) {
    if (data.payments && data.payments.length) {
      const order = await get(id);
      validAddPay(data, order);
      changeStatePay(data, order);
    }
  }

  function changeStatePay(data, order) {
    // eslint-disable-next-line no-param-reassign
    if (getTotalCost(order) === getTotalPayments(data)) data.state = 'payed';
  }

  function validAddPay(data, order) {
    const totalCost = getTotalCost(order);
    const totalPayments = getTotalPayments(data);
    if (totalPayments > totalCost) throw err('Payments greather than costs', 400);
  }

  function getTotalCost(order) {
    return order.products.reduce((totalCost, product) => {
      const { discount, cost } = product;
      return totalCost + cost * (1 - discount);
    }, 0) + order.delivery.cost;
  }

  function getTotalPayments(order) {
    return order.payments.reduce((totalPayments, pay) => totalPayments + pay, 0);
  }

  return {
    create,
    list,
    get,
    update,
    deliverOrder,
  };
};
