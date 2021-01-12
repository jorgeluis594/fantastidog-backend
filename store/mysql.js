const mysql = require('mysql');
const config = require('../config');
const utils = require('./utils');

const dbconf = config.mysql;

function rowDataToObject(data) {
  return JSON.parse(JSON.stringify(data));
}

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB connected');
    }
  });

  connection.on('error', (err) => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      return resolve(rowDataToObject(data));
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err);
      return resolve(rowDataToObject(data)[0]);
    });
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    const [columns, values] = utils.formatMysqlValues(data);
    connection.query(`INSERT INTO ${table} ${columns} VALUES ?`, [values], async (err, result) => {
      if (err) return reject(err);
      const insertedData = await get(table, result.insertId);
      return resolve(insertedData);
    });
  });
}

function update(table, id, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], async (err) => {
      if (err) return reject(err);
      const insertedData = await get(table, id);
      return resolve(insertedData);
    });
  });
}

function query(table, filters) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, filters, (err, result) => {
      if (err) return reject(err);
      return resolve(rowDataToObject(result));
    });
  });
}

module.exports = {
  list,
  get,
  query,
  insert,
  update,
};
