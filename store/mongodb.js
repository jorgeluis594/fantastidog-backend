const db = require('mongoose');
const { mongodb } = require('../config');

const MONGO_URI = `mongodb://${mongodb.host}/${mongodb.database}`;

db.Promise = global.Promise;
db.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then((result) => {
    console.log(`Mongodb is connected to ${result.connection.host}`);
  })
  .catch((err) => {
    console.error(err);
  });
