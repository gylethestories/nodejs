var fs = require("fs");
var path = require("path");

function render(res, data) {
  res.writeHead(200, { "Content-Type": "text/json;charset=utf8" });
  res.write(data);
  res.end();
}

const apiRouter = {
  "/api/login": (req, res) => {
    const myURL = new URL(req.url, "http://127.0.0.1");

    if (myURL.searchParams.get("username") === "alan" && myURL.searchParams.get("password") === "123456") {
      render(res, `{"ok":0}`);
      return;
    }
    render(res, `{"ok":1}`);
  },

  "/api/loginpost": (req, res) => {
    var post = "";
    req.on("data", (chunk) => {
      post += chunk;
    });

    req.on("end", () => {
      if (post.username === "alan" && post.password === "123456") {
        render(res, `{"ok":0}`);
        return;
      }
      render(res, `{"ok":1}`);
    });
  },
};

module.exports = apiRouter;
