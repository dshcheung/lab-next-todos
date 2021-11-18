var DataTypes = require("sequelize").DataTypes;
var _SequelizeMetum = require("./sequelize_metum");
var _TodoItem = require("./todo_item");
var _Todo = require("./todo");

function initModels(sequelize) {
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var TodoItem = _TodoItem(sequelize, DataTypes);
  var Todo = _Todo(sequelize, DataTypes);


  return {
    SequelizeMetum,
    TodoItem,
    Todo,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
