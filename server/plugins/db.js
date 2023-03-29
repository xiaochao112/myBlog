module.exports = (app) => {
  const mongoose = require("mongoose");
  const db_user = 'hwc'; // 数据库用户名
  const db_pwd = '123456'; // 数据库密码
  const db_name = 'mydb'; // 数据库名字
  const db_host = '175.178.191.198'; // 数据库地址

  // mongoose.connect(`mongodb://${db_user}:${db_pwd}@${db_host}:27017/${db_name}?authSource=admin`, {
  //   useNewUrlParser: true,
  //   useFindAndModify: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: true
  // });
  mongoose.connect(`mongodb://localhost:27017/${db_name}`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  });
  require("require-all")(__dirname + "/../models");
};
