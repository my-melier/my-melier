const Sequelize = require('sequelize');
const db = require('../db');

const Wine = db.define(
  'wine',
  {
    points: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    designation: {
      type: Sequelize.STRING,
    },
    variety: {
      type: Sequelize.STRING,
    },
    region_1: {
      type: Sequelize.STRING,
    },
    province: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    winery: {
      type: Sequelize.STRING,
    },
  },
  {
    indexes: [
      {
        name: 'title_index',
        method: 'BTREE',
        fields: [
          'title',
          { attribute: 'title', collate: 'en_US', order: 'DESC' },
        ],
      },
    ],
  }
);

module.exports = Wine;
