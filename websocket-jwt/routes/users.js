const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

router.post("/user", upload.single("avatar"), UserController.addUser);

router.put("/user/:myid", UserController.updateUser);

router.delete("/user/:id", UserController.deleteUser);

router.get("/user/list", UserController.getUser);

//登录校验
router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

module.exports = router;
