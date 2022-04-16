const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdminAuthorization,
} = require("../middlewares/verifytoken");
const userService = require("../services/userService");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const result = await userService.updateUserDetails(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/find/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await userService.getUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await userService.getAllUsers(req.query);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/stats", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await userService.getUsersStats();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
