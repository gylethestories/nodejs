const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const port = 9000;

app.get("/", async (req, res) => {
  const config = getDBConfig();
  const promisePool = mysql2.createPool(config).promise();
  // console.log(promisePool)
  let user = await promisePool.query("select * from students");

  console.log(user);
  if (user[0].length) {
    //存在用户
    res.send(user[0]);
  } else {
    //不存在
    res.send({
      code: -2,
      msg: "user not exsit",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function getDBConfig() {
  return {
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "",
    database: "kerwin_test",
    connectionLimit: 1, //创建一个连接池
  };
}
