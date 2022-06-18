var fs = require("fs");
var path = require("path");
const mime = require("mime");

function render(res, path, type) {
  res.writeHead(200, { "Content-Type": `${type} ? ${type} : text/html;charset=utf8` });
  res.write(fs.readFileSync(path, "utf8"));
  res.end();
}

const route = {
  "/login": (req, res) => {
    render(res, "./static/login.html");
  },
  "/": (req, res) => {
    render(res, "./static/home.html");
  },
  "/home": (req, res) => {
    render(res, "./static/home.html");
  },
  "/list": (req, res) => {
    render(res, "./static/list.html");
  },
  "/404": (req, res) => {
    if (readStaticFile(req, res)) {
      return;
    }
    res.writeHead(404, { "Content-Type": "text/html;charset=utf8" });
    res.write(fs.readFileSync("./static/404.html", "utf8"));
  },
};

function readStaticFile(req, res) {
  const myURL = new URL(req.url, "http://127.0.0.1:3000");
  var filePathname = path.join(__dirname, "/static", myURL.pathname);

  if (myURL.pathname === "/") return;

  if (fs.existsSync(filePathname)) {
    // console.log(1111)
    res.writeHead(200, { "Content-Type": `${mime.getType(myURL.pathname.split(".")[1])};charset=utf8` });
    res.write(fs.readFileSync(filePathname, "utf8"));
    res.end();
    return true;
  } else {
    return false;
  }
}

module.exports = route;
