const express = require("express");
const router = express.Router();

/* GET chat page. */
router.get("/", function (req, res, next) {
  res.render("chat", { title: "Express" });
});

module.exports = router;
