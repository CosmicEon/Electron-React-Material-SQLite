const Sequelize = require('sequelize');
const path = require('path');


const db = new Sequelize('shoppingCart', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', '..', 'DB', 'CryptoBeast.db'),
  operatorsAliases: false,
});

const Product = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
}); // used to define the Table Product

db.sync({}); // executes db.define

function randomPrice() {
  return Math.floor((Math.random() * (1000 - (500 + 1))) + 500);
}

const products = [
  {
    name: 'Motorola G5',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'One Plus 5',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'Iphone 7',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'Samsung Galaxy 8',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'Redmi Note 4',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'Lenovo Vibe K5',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'Google Pixel',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'Honor 6X',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'HTC Desire 10 Pro',
    price: randomPrice(),
    quantity: 1,
  },
  {
    name: 'Sony Xperia X Dual',
    price: randomPrice(),
    quantity: 1,
  },
];

Product.bulkCreate(products); // creating bulk products

function initDB() {
  Product.bulkCreate(products); // creating bulk products
}


module.exports = { initDB };
