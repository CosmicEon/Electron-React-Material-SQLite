const Sequelize = require('sequelize');
const path = require('path');


const db = new Sequelize('shoppingCart', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'DB', 'CryptoBeast.sqlite'),
  operatorsAliases: false
});

const Product = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER
}); // used to define the Table Product

db.sync({}); // executes db.define

const products = [
  {
    name: 'Motorola G5',
    price: 15000,
    quantity: 1,
  },
  {
    name: 'One Plus 5',
    price: 30000,
    quantity: 1,
  },
  {
    name: 'Iphone 7',
    price: 42500,
    quantity: 1,
  },
  {
    name: 'Samsung Galaxy 8',
    price: 64500,
    quantity: 1,
  },
  {
    name: 'Redmi Note 4',
    price: 11000,
    quantity: 1,
  },
  {
    name: 'Lenovo Vibe K5',
    price: 8000,
    quantity: 1,
  },
  {
    name: 'Google Pixel',
    price: 43000,
    quantity: 1,
  },
  {
    name: 'Honor 6X',
    price: 12000,
    quantity: 1,
  },
  {
    name: 'HTC Desire 10 Pro',
    price: 21415,
    quantity: 1,
  },
  {
    name: 'Sony Xperia X Dual',
    price: 43000,
    quantity: 1,
  }
];
Product.bulkCreate(products); // creating bulk products

function initDB() {
  Product.bulkCreate(products); // creating bulk products
}

module.exports = { initDB };
