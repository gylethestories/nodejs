const server = require("./server");
const route = require("./route");
const api = require("./api");

server.use(route);
server.use(api);

server.start();
