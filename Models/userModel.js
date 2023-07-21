module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    iUserId: {
      type: DataTypes.INTEGER, // max value of 92233
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    sName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nMobile: {
        type: DataTypes.INTEGER, // max value of 92233
        allowNull: true
    },
    sCity: {
        type: DataTypes.STRING,
        defaultValue: false,
        allowNull: false,
    }
  })
  return User
}
