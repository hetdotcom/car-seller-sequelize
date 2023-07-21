module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transactions', {
    iTransactionId: {
      type: DataTypes.INTEGER, // max value of 92233
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    iBuyerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'iUserId',
      },
    },
    iSellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'sellers',
        key: 'iSellerId',
      },
    },
    iCarId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cars',
        key: 'iCarId',
      },
    },

  })
  return Transaction
}
