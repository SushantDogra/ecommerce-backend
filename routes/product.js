const router = require("express").Router();
const {
  verifyTokenAndAdminAuthorization,
} = require("../middlewares/verifytoken");
const productService = require("../services/productService");

router.post("/", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await productService.updateProductDetails(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdminAuthorization, async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const result = await productService.getProduct(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
