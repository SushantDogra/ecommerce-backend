const router = require("express").Router();
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
