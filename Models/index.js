/* eslint-disable no-undef */
const dbConfig = require('../Config/dbConfig')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
  dbConfig.DB || 'car_db',
  dbConfig.USER || 'root',
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // true while debugging only,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    // query: { raw: true },
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected successfully :)')
  })
  .catch((err) => {
    console.error(`Unable to connect to the database:\n${err}`)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./userModel')(sequelize, DataTypes)
db.transaction = require('./transactionModel')(sequelize, DataTypes)
db.seller = require('./sellerModel')(sequelize, DataTypes)
db.car = require('./carModel')(sequelize, DataTypes)
db.brand = require('./brandModel')(sequelize, DataTypes)
db.car_seller = require('./car_sellerModel')(sequelize, DataTypes)
db.user_car = require('./user_carModel')(sequelize, DataTypes)

// ----------------------------- One to Many ----------------------------------------
db.brand.hasMany(db.car, {
  foreignKey: 'iBrandId',
  onDelete: 'set null',
})
db.car.belongsTo(db.brand, { foreignKey: 'iBrandId' })

// ---------------------------- Many to Many ----------------------------------------
db.car.belongsToMany(db.seller, {
  through: 'car_sellers',
  foreignKey: 'iCarId',
})
db.seller.belongsToMany(db.car, {
  through: 'car_sellers',
  foreignKey: 'iSellerId',
})

db.car.belongsToMany(db.user, { through: 'user_cars', foreignKey: 'iCarId' })
db.user.belongsToMany(db.car, { through: 'user_cars', foreignKey: 'iUserId' })

// -----------------------------------------------------------------------------------
db.sequelize.sync({ force: false }).then(() => {
  console.log('re-sync done')
})

module.exports = { db, sequelize }
