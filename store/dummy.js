const db = {
  user: [
    { id: '1', name: 'Carlos' },
  ],
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  const col = await list(table);
  return col.find((item) => item.id === id) || null;
}

async function upsert(table, data) {
  if (!db[table]) db[table] = [];
  db[table].push(data);
  console.log(db[table]);
}

async function remove(/* table, id */) {
  return true;
}

async function query(table, q) {
  const collection = await list(table);
  const keys = Object.keys(q);
  const key = keys[0];
  return collection.filter((item) => item[key] === q[key])[0];
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
