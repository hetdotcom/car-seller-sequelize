module.exports = (sequelize, DataTypes) => {
  const User_car = sequelize.define(
    'user_cars',
    {
      iUser_carId: {
        type: DataTypes.INTEGER, // max value of 92233
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      iCarId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cars',
          key: 'iCarId',
        },
      },
      iUserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'iUserId',
        },
      },
    },
    {
      timestamps: false,
    }
  )
  return User_car
}