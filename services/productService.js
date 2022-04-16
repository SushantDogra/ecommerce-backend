const Product = require("../models/Product");

module.exports = {
  createProduct: async (requestPayload) => {
    const newProduct = new Product(requestPayload);
    const savedProduct = await newProduct.save();
    return savedProduct;
  },

  updateProductDetails: async (productId, requestPayload) => {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: requestPayload,
      },
      { new: true }
    );
    return updatedProduct;
  },

  deleteProduct: async (productId) => {
    await Product.findByIdAndDelete(productId);
    return true;
  },

  getProduct: async (productId) => {
    const product = await User.findById(productId);
    return product;
  },

  getAllProducts: async (queryParams) => {
    const qNew = queryParams.new;
    const qCategory = queryParams.category;
    let products = [];
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    return products;
  },
};
