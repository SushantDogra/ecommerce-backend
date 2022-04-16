const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifytoken");
const userService = require("../services/userService");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const result = await userService.updateUserDetails(req.params.id, req.body);
  res.json(result);
});

module.exports = router;
