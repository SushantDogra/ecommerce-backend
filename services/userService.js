const User = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = {
  updateUserDetails: async (userId, requestPayload) => {
    let encryptedPassword;
    if (requestPayload.password) {
      encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET
      ).toString();
    }
    const updatedUser = {};
    if (encryptedPassword) updatedUser.password = encryptedPassword;
    if (requestPayload.email) updatedUser.email = requestPayload.email;
    if (requestPayload.username) updatedUser.username = requestPayload.username;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: updatedUser,
      },
      { new: true }
    );
    const { password, ...others } = user._doc;
    return others;
  },

  deleteUser: async (userId) => {
    await User.findByIdAndDelete(userId);
    return true;
  },

  getUser: async (userId) => {
    const user = await User.findById(userId);
    const { password, ...others } = user;
    return others;
  },

  getAllUsers: async (queryParams) => {
    let users = [];
    if (queryParams.new) {
      users = await User.find().sort({ _id: -1 }).limit(5);
    }
    users = await User.find();
    return users;
  },

  getUsersStats: async () => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return data;
  },
};
