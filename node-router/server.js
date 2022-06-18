const http = require("http");
const route = require("./route");

function use(obj) {
  Object.assign(route, obj);
}

function start() {
  http
    .createServer((req, res) => {
      const myURL = new URL(req.url, "http://127.0.0.1");
      try {
        route[myURL.pathname](req, res);
      } catch (error) {
        route["/404"](req, res);
      }
    })
    .listen(3000, () => {
      console.log("server start");
    });
}

exports.start = start;
exports.use = use;
