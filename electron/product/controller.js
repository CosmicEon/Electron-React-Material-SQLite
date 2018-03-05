const Product = require('./model');

module.exports = {
  getProducts() { return Product.findAll(); },

  addToProducts(product) {
    // Product.findById(product.id).then(cartItem => {
    //     return;
    // })
    return Product.create({
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  },
};
