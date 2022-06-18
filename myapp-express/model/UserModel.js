const mongoose = require("mongoose");

const Schma = mongoose.Schema;

const UserType = {
  username: String,
  password: String,
  age: String,
  avatar: String,
};

const UserModel = mongoose.model("user", new Schma(UserType));
//模型user 将会对应user集合

module.exports = UserModel;
