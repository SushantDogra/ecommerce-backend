const Order = require("../models/Order");

module.exports = {
  createOrder: async (requestPayload) => {
    const newOrder = new Order(requestPayload);
    const savedOrder = await newOrder.save();
    return savedOrder;
  },

  updateOrder: async (orderId, requestPayload) => {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: requestPayload,
      },
      { new: true }
    );
    return updatedOrder;
  },

  deleteOrder: async (orderId) => {
    await Order.findByIdAndDelete(orderId);
    return true;
  },

  getOrders: async (userId) => {
    const order = await Order.find({ userId });
    return order;
  },

  getAllOrders: async () => {
    const orders = await Order.find();
    return orders;
  },

  getMonthlyIncome: async (productId) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    return income;
  },
};
