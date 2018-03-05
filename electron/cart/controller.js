const { Cart } = require('./model');

module.exports = {
  addToCart(product) {
    Cart.findById(product.id)
      .then((cartItem) => {
        cartItem.increment('quantity', { by: product.quantity });
        cartItem.increment('amount', { by: product.amount });

        return cartItem;
      })
      .catch((error) => {
        console.log(error);
      });

    return Cart.create({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      amount: product.amount,
    });
  },

  getCart() {
    if (Cart.findAll()) {
      return Cart.findAll();
    }

    return 0;
  },

  decrementCart(cartItemID) {
    Cart.findById(cartItemID)
      .then((user) => {
        user.decrement('quantity', { by: 1 });
        user.decrement('amount', { by: user.price });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  incrementCart(cartItemID) {
    Cart.findById(cartItemID)
      .then((user) => {
        user.increment('quantity', { by: 1 });
        user.increment('amount', { by: user.price });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  numOfProducts() {
    if (Cart.sum('quantity')) {
      return Cart.sum('quantity');
    }

    return 0;
  },

  totalAmount() {
    if (Cart.sum('amount')) {
      return Cart.sum('amount');
    }

    return 0;
  },


  cartCheckout() { Cart.destroy({ where: {} }); },

  delFromCart(cartItemID) {
    return Cart.destroy({
      where:
        {
          id: cartItemID,
        },
    });
  },
};
