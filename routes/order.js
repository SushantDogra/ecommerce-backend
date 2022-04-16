const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("order found");
});

module.exports = router;
