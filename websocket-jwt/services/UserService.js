const UserModel = require("../model/UserModel");
const UserService = {
  addUser: (username, password, age, avatar) => {
    return UserModel.create({
      username,
      password,
      age,
      avatar,
    });
  },

  updateUser: (_id, username, password, age) => {
    return UserModel.updateOne(
      { _id },
      {
        username,
        password,
        age,
      }
    );
  },

  deleteUser: (_id) => {
    return UserModel.deleteOne({
      _id: _id,
    });
  },

  getUser: (page, limit) => {
    return UserModel.find({}, ["username", "age", "avatar"])
      .sort({ age: -1 })
      .skip(page - 1 * limit)
      .limit(limit);
  },

  login: (username, password) => {
    return UserModel.find({ username, password });
  },
};

module.exports = UserService;
