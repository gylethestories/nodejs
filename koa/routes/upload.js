const Router = require("koa-router");

const router = new Router();

router.get("/", async (ctx, next) => {
  await ctx.render("upload", { title: "koa" });
});

module.exports = router;
