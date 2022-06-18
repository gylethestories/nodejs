const UserService = require("../services/UserService");
const JWT = require("../util/JWT");

const UserController = {
  addUser: async (req, res) => {
    // 插入数据库
    //1. 创建一个模型(user), 一一对应数据库的集合(users)
    const { username, password, age } = req.body;
    const avatar = req.file ? `/uploads/${req.file.filename}` : `/images/default.png`;
    await UserService.addUser(username, password, age, avatar);
    res.send({ ok: 1 });
  },

  updateUser: async (req, res) => {
    console.log(req.body, req.params.myid);
    const { username, password, age } = req.body;
    await UserService.updateUser(req.params.myid, username, password, age);
    res.send({ ok: 1 });
  },

  deleteUser: async (req, res) => {
    await UserService.deleteUser(req.params.id);
    res.send({ ok: 1 });
  },

  getUser: async (req, res) => {
    const { page, limit } = req.query;
    const data = await UserService.getUser(page, limit);
    res.send(data);
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const data = await UserService.login(username, password);
    console.log(data);
    if (data.length === 0) {
      res.send({ ok: 0 });
    } else {
      // 设置session
      // req.session.user = data[0];

      //生成token
      const token = JWT.generate(
        {
          _id: data[0]._id,
          username: data[0].username,
        },
        "1d"
      );

      res.header("Authorization", token);

      res.send({ ok: 1 });
    }
  },

  logout: (req, res) => {
    req.session.destroy(() => {
      res.send({ ok: 1 });
    });
  },
};
module.exports = UserController;
