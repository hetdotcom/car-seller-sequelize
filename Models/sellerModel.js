module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('sellers', {
    iSellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sSeller: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sCity: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
    }
  })
  return Seller
}
