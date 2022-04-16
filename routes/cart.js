const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("cart found");
});

module.exports = router;
