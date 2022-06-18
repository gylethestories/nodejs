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
var chatRouter = require("./routes/chat");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//node中间件校验 JWT
app.use((req, res, next) => {
  // 如果token有效 ,next()
  // 如果token过期了, 返回401错误
  if (req.url.includes("/login")) {
    next();
    return;
  }
  const token = req.headers["authorization"]?.split(" ")[1];

  if (token) {
    var payload = JWT.verify(token);
    // console.log(payload)
    if (payload) {
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username,
        },
        "1d"
      );
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" });
    }
  } else {
    next();
  }
});

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);
app.use("/chat", chatRouter);

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
