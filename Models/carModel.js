module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('cars', {
    iCarId: {
      type: DataTypes.INTEGER, // max value of 92233
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sFuelType: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
    },
    sType: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
    },
    nSafetyRating: {
      type: DataTypes.INTEGER, // max value of 92233
      allowNull: true,
    },
    iBrandId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'brands',
        key: 'iBrandId',
      },
    },
  })
  return Car
}
