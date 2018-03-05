const { INTEGER, STRING } = require('sequelize');
const db = require('../config/db');

const Cart = db.define('carts', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: STRING,
  price: INTEGER,
  quantity: INTEGER,
  amount: INTEGER,
});

module.exports = Cart;
