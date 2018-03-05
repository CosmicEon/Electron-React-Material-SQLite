const Sequelize = require('sequelize');
const path = require('path');


const sequelize = new Sequelize('shoppingCart', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'DB', 'CryptoBeast.db'),
  operatorsAliases: false,
});

// const db = {};

// db.product = sequelize.import(path.join(__dirname, '/product/model.js'));
// db.cart = sequelize.import(path.join(__dirname, '/cart/model.js'));
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.product.belongsTo(db.cart);
// db.cart.hasMany(db.product);

// module.exports = db;
module.exports = sequelize;

