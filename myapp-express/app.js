var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var uploadRouter = require("./routes/upload");

var app = express();

app.use(
  session({
    name: "alansesytem",
    secret: "this is session", // 服务器生成 session 的签名
    resave: true,
    saveUninitialized: true, //强制将为初始化的 session 存储
    cookie: {
      maxAge: 1000 * 60 * 10, // 过期时间
      secure: false, // 为 true 时候表示只有 https 协议才能访问cookie
    },
    rolling: true, //为 true 表示 超时前刷新，cookie 会重新计时； 为 false 表示在超时前刷新多少次，都是按照第一次刷新开始计时。
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/alan_session",
      ttl: 1000 * 60 * 10, // 过期时间
    }),
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 设置中间件，session过期校验
app.use((req, res, next) => {
  if (req.url.includes("login")) {
    next();
    return;
  }
  if (req.session.user) {
    req.session.date = Date.now();
    next();
  } else {
    req.url.includes("api") ? res.status(401).json({ ok: 0 }) : res.redirect("/login");
  }
});

//node中间件校验 JWT
// app.use((req, res, next) => {
//   // 如果token有效 ,next()
//   // 如果token过期了, 返回401错误
//   if (req.url.includes("login")) {
//     next();
//     return;
//   }

//   const token = req.headers["authorization"].split(" ")[1];
//   if (token) {
//     var payload = JWT.verify(token);
//     // console.log(payload)
//     if (payload) {
//       const newToken = JWT.generate(
//         {
//           _id: payload._id,
//           username: payload.username,
//         },
//         "1d"
//       );
//       res.header("Authorization", newToken);
//       next();
//     } else {
//       res.status(401).send({ errCode: "-1", errorInfo: "token过期" });
//     }
//   }
// });

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
