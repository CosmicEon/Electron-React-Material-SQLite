const { INTEGER, STRING } = require('sequelize');
const db = require('../config/db');

const Product = db.define('products', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: STRING,
  price: INTEGER,
  quantity: INTEGER,
});

module.exports = Product;
