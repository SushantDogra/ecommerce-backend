const User = require("../models/User");

module.exports = {
  registerUser: async (requestPayload) => {
    const { username, email, password } = requestPayload;
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    return { username, email };
  },
};
