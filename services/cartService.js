const Cart = require("../models/Cart");

module.exports = {
  createCart: async (requestPayload) => {
    const newCart = new Cart(requestPayload);
    const savedCart = await newCart.save();
    return savedCart;
  },

  updateCart: async (cartId, requestPayload) => {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: requestPayload,
      },
      { new: true }
    );
    return updatedCart;
  },

  deleteCart: async (cartId) => {
    await Cart.findByIdAndDelete(cartId);
    return true;
  },

  getCart: async (userId) => {
    const cart = await Cart.findOne({ userId });
    return cart;
  },

  getAllCarts: async () => {
    const carts = await Cart.find();
    return carts;
  },
};
