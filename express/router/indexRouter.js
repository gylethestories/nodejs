const express = require("express");
const router = express.Router();

// 匹配根路径的请求
router.get("/", function (req, res) {
  res.send("hello world");
});

router.get("/login", function (req, res) {
  console.log(req.query);
  res.send(`{"ok":1}`);
});

router.post("/login", function (req, res) {
  console.log(req.body);
  res.send(`{"ok":1}`);
});

router.get("/home", function (req, res) {
  res.send("home");
});

router.get("/ejs", function (req, res) {
  res.render("login", { title: 11111 });
});

router.get("/list", function (req, res) {
  res.send([1111, 2222, 3333, 4444, 5555, 6666, 7777]);
});

module.exports = router;
