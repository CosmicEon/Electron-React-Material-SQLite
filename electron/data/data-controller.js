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

const CartProduct = db.define('carts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  amount: Sequelize.INTEGER
}); // used to define the Table

db.sync({}); // executes db.define

function getProducts() { return Product.findAll() } // end of the function getProducts

// definition of the function addToProducts
function addToProducts(product) {
  // Product.findById(product.id).then(cartItem => {
  //     return;
  // })
  return Product.create({
    name: product.name,
    price: product.price,
    quantity: 1,
  });
} // end of the function definition

// definition of the function addToCart
function addToCart(product) {
  CartProduct.findById(product.id)
    .then(cartItem => {
      cartItem.increment('quantity', { by: product.quantity });
      cartItem.increment('amount', { by: product.amount });
      return cartItem;
    })
    .catch((error) => {
      console.log(error);
    });

  return CartProduct.create({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    amount: product.amount
  });
} // end of the function addToCart

// definition of the function getCart
function getCart() {
  if (CartProduct.findAll()) {
    return CartProduct.findAll();
  }

  return 0;
}
// end of the function getCart

// definition of the function decrementCart
function decrementCart(cartItemID) {
  CartProduct.findById(cartItemID)
    .then(user => {
      user.decrement('quantity', { by: 1 });
      user.decrement('amount', { by: user.price });
    })
    .catch((error) => {
      console.log(error);
    });
} // end of the function decrementCart

// definition of the function incrementCart
function incrementCart(cartItemID) {
  CartProduct.findById(cartItemID)
    .then(user => {
      user.increment('quantity', { by: 1 });
      user.increment('amount', { by: user.price });
    })
    .catch((error) => {
      console.log(error);
    });
}
// end of the function incrementCart

// definition of the function numOfProducts
function numOfProducts() {
  if (CartProduct.sum('quantity')) {
    return CartProduct.sum('quantity');
  }

  return 0;
} // end of the function numOfProducts

// definition of the function totalAmount
function totalAmount() {
  if (CartProduct.sum('amount')) {
    return CartProduct.sum('amount');
  }

  return 0;
}
// end of the function totalAmount

function cartCheckout() { CartProduct.destroy({ where: {} }); }
// end of the function cartCheckout

// definition of the function delFromCart
function delFromCart(cartItemID) {
  return CartProduct.destroy({
    where:
      {
        id: cartItemID
      }
  });
} // end of the function delFromCart

module.exports = {
  getProducts,
  addToCart,
  addToProducts,
  getCart,
  cartCheckout,
  numOfProducts,
  totalAmount,
  delFromCart,
  incrementCart,
  decrementCart
};

// all exported files

// this is the file which interacts with the database
