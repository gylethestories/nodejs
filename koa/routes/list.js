const Router = require("koa-router");

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = ["111", "222", "333"];
});
router.post("/", (ctx, next) => {
  ctx.body = { ok: 1, info: "put list success" };
});
router.put("/", (ctx, next) => {
  ctx.body = ["111", "222", "333"];
});
router.del("/", (ctx, next) => {
  ctx.body = ["111", "222", "333"];
});

module.exports = router;
