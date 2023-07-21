module.exports = (sequelize, DataTypes) => {
  const Car_seller = sequelize.define(
    'car_sellers',
    {
      iCar_sellerId: {
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
      iSellerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sellers',
          key: 'iSellerId',
        },
      },
    },
    {
      timestamps: false,
    }
  )
  return Car_seller
}
