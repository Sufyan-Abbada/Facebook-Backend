const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: { args: /^[a-z A-Z]+$/i, msg: "Name must be letters only" },
          len: {
            args: [3, 25],
            msg: "Name should only contain Letters and must have a length of 5 - 25 letters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            msg: "Password should be Alphanumeric and must have a length of 5 - 25 letters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  )
  return User
}
