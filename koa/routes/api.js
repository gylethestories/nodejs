const Router = require("koa-router");

const router = new Router();

const multer = require("@koa/multer");
const upload = multer({ dest: "public/uploads/" });

const UserModel = require("../model/UserModel");

router.post("/login", (ctx, next) => {
  console.log(ctx.request.body);
  const { username, password } = ctx.request.body;
  if (username === "alan" && password === "123456") {
    ctx.session.user = username;
    ctx.body = { ok: 1, info: "login success" };
  } else {
    ctx.body = { ok: 0, info: "login failed" };
  }
});

router.post("/upload", upload.single("avatar"), (ctx, next) => {
  console.log(ctx.request.body, ctx.file);
  const { username, password, age } = ctx.request.body;

  const avatar = ctx.request.file ? `/uploads/${ctx.request.file.filename}` : `/images/default.png`;
  UserModel.create({
    username,
    password,
    age,
    avatar,
  });
  ctx.body = {
    ok: 1,
    info: "add user success",
  };
});
module.exports = router;
