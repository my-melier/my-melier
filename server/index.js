const express = require('express');
const { db } = require('./db');
const app = express();

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

db.sync().then(() => {
  app.listen(8080, () => console.log('listening on port 8080'));
});
