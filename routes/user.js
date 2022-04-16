const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("User found");
});

router.post("/", (req, res) => {
  const { username } = req.body;
  res.send(`you posted ${username}`);
});

module.exports = router;
