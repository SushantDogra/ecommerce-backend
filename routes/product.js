const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Products found");
});

module.exports = router;
