const express = require("express");
const app = express();
const IndexRouter = require("./router/indexRouter");

app.use(function (req, res, next) {
  console.log("验证token");
  next();
});

app.set("views", "./views");
app.set("view engine", "ejs");
// 配置中间件
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false })); // post参数- username=alan&password=123456
app.use(express.json()); // post参数- {name:alan,password:123456}

app.use("/", IndexRouter);

app.use((req, res) => {
  res.status(404).send("丢了");
});

app.listen(3000, () => {
  console.log("server start");
});
