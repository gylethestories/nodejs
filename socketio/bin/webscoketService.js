const JWT = require("../util/JWT");
const WebSocketType = {
  Error: 0, //错误
  GroupList: 1, //群列表
  GroupChat: 2, //群聊
  SingleChat: 3, //私聊
};
function start(server) {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    const payload = JWT.verify(socket.handshake.query.token);
    if (payload) {
      socket.user = payload;
      socket.emit(WebSocketType.GroupChat, createMessage(socket.user, "欢迎来到聊天室"));
      sendBroadList(io); //发送好友列表
    } else {
      socket.emit(WebSocketType.Error, createMessage(null, "token过期"));
    }

    socket.on(WebSocketType.GroupList, () => {
      socket.emit(
        WebSocketType.GroupList,
        createMessage(
          null,
          Array.from(io.sockets.sockets)
            .map((item) => item[1].user)
            .filter((item) => item)
        )
      );
    });

    socket.on(WebSocketType.GroupChat, (messageObj) => {
      socket.broadcast.emit(WebSocketType.GroupChat, createMessage(socket.user, messageObj.data));
    });

    socket.on(WebSocketType.SingleChat, (messageObj) => {
      Array.from(io.sockets.sockets).forEach(function (socket) {
        if (socket[1].user.username === messageObj.to) {
          socket[1].emit(WebSocketType.SingleChat, createMessage(socket[1].user, messageObj.data));
        }
      });
    });

    socket.on("disconnect", (reason) => {
      sendBroadList(io); //发送好用列表
    });
  });
}

function createMessage(user, data) {
  return JSON.stringify({
    user,
    data,
  });
}

function sendBroadList(io) {
  io.sockets.emit(
    WebSocketType.GroupList,
    createMessage(
      null,
      Array.from(io.sockets.sockets)
        .map((item) => item[1].user)
        .filter((item) => item)
    )
  );
}
module.exports = start;
