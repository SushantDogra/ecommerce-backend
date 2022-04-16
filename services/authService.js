const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  registerUser: async (requestPayload) => {
    const { username, email, password } = requestPayload;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString();
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });

    const savedUser = await newUser.save();
    return savedUser;
  },

  loginUser: async (requestPayload) => {
    const { username, password: userInputPassword } = requestPayload;
    const user = await User.findOne({ username });
    if (!user) throw new Error("user not found");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (userInputPassword !== OriginalPassword)
      throw new Error("incorrect password");

    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    return { ...others, accessToken };
  },
};
