const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdminAuthorization,
} = require("../middlewares/verifytoken");
const orderService = require("../services/orderService");

router.post("/", verifyToken, async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await orderService.updateOrder(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await orderService.deleteOrder(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const result = await orderService.getOrders(req.params.userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await orderService.getAllOrders();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/income", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await orderService.getMonthlyIncome(req.query.pid);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
