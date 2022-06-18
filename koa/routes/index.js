const Router = require("koa-router");
const listRouter = require("./list");
const homeRouter = require("./home");
const loginRouter = require("./login");
const apiRouter = require("./api");
const uploadRouter = require("./upload");

const router = new Router();

//统一加前缀
// router.prefix("/api");
//先注册成理由级别的组件
router.use("/list", listRouter.routes(), listRouter.allowedMethods());

router.use("/api", apiRouter.routes(), apiRouter.allowedMethods());

router.use("/home", homeRouter.routes(), homeRouter.allowedMethods());

router.use("/login", loginRouter.routes(), loginRouter.allowedMethods());

router.use("/upload", uploadRouter.routes(), uploadRouter.allowedMethods());

router.redirect("/", "/home");

module.exports = router;
