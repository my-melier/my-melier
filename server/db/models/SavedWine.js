const Sequelize = require('sequelize');
const db = require('../db');

const SavedWine = db.define('savedWine', {
  like: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = SavedWine;
