const User = require("../models/User");

module.exports = {
  createUser: async (requestPayload) => {
    const { username, email, password } = requestPayload;
    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    return savedUser;
  },
};
