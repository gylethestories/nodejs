const Koa = require("koa");
const router = require("./routes");
const static = require("koa-static");
const path = require("path");
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const session = require("koa-session-minimal");

require("./config/db.config");

const app = new Koa();

app.use(
  session({
    key: "SESSION_ID",
    cookie: {
      maxAge: 1000 * 60,
    },
  })
);

app.use(async (ctx, next) => {
  //排除login相关的路由和接口
  if (ctx.url.includes("login")) {
    await next();
    return;
  }

  if (ctx.session.user) {
    //重新设置以下sesssion
    ctx.session.mydate = Date.now();
    await next();
  } else {
    ctx.redirect("/login");
  }
});

app.use(static(path.join(__dirname, "public")));

// 使用ctx.body解析中间件
app.use(bodyParser());

// 加载模板引擎
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "ejs",
  })
);

//再注册成应用级别的组件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
