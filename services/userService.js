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
};
