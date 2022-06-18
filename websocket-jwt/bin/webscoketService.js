const WebSocket = require("ws");
const JWT = require("../util/JWT");
WebSocketServer = WebSocket.WebSocketServer;
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function connection(ws, req) {
  const myURL = new URL(req.url, "http://127.0.0.1:3000");
  const payload = JWT.verify(myURL.searchParams.get("token"));

  if (payload) {
    ws.user = payload;
    ws.send(createMessage(WebSocketType.GroupChat, ws.user, "欢迎来到聊天室"));

    sendBroadList(); //发送好友列表
  } else {
    ws.send(createMessage(WebSocketType.Error, null, "token过期"));
  }
  // console.log(3333,url)
  ws.on("message", function message(data, isBinary) {
    const messageObj = JSON.parse(data);
    switch (messageObj.type) {
      case WebSocketType.GroupList:
        ws.send(createMessage(WebSocketType.GroupList, ws.user, JSON.stringify(Array.from(wss.clients).map((item) => item.user))));
        break;
      case WebSocketType.GroupChat:
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(createMessage(WebSocketType.GroupChat, ws.user, messageObj.data));
          }
        });
        break;
      case WebSocketType.SingleChat:
        wss.clients.forEach(function each(client) {
          if (client.user.username === messageObj.to && client.readyState === WebSocket.OPEN) {
            client.send(createMessage(WebSocketType.SingleChat, ws.user, messageObj.data));
          }
        });
        break;
    }

    ws.on("close", function () {
      //删除当前用户
      wss.clients.delete(ws.user);
      sendBroadList(); //发送好用列表
    });
  });
});
const WebSocketType = {
  Error: 0, //错误
  GroupList: 1, //群列表
  GroupChat: 2, //群聊
  SingleChat: 3, //私聊
};
function createMessage(type, user, data) {
  return JSON.stringify({
    type: type,
    user: user,
    data: data,
  });
}

function sendBroadList() {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(createMessage(WebSocketType.GroupList, client.user, JSON.stringify(Array.from(wss.clients).map((item) => item.user))));
    }
  });
}
