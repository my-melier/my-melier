const express = require('express');
const { db } = require('./db');
const app = express();

module.exports = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));
app.use('/auth', require('./auth'));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

db.sync().then(() => {
  app.listen(8080, () => console.log('listening on port 8080'));
});
