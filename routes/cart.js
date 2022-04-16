const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdminAuthorization,
} = require("../middlewares/verifytoken");
const cartService = require("../services/cartService");

router.post("/", verifyToken, async (req, res) => {
  try {
    const result = await cartService.createCart(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const result = await cartService.updateCart(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const result = await cartService.deleteCart(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const result = await cartService.getCart(req.params.userId);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await cartService.getAllCarts();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
