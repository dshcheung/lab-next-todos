const { Model } = require('sequelize')
const TodoSchema = require('../schema/todo')

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    // static associate(models) {
    // }
  }

  const { tableAttributes } = TodoSchema(sequelize, DataTypes)
  Todo.init(tableAttributes, {
    sequelize,
    modelName: 'Todo'
  })
  return Todo
}
