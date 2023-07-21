module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('brands', {
    iBrandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sCountryOfOrigin: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
    },
  })
  return Brand
}
