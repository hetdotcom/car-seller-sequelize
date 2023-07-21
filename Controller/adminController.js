/* eslint-disable no-undef */

const messages = require('../messages')
const { db, sequelize } = require('../Models/index')
const Brand = db.brand
const Car = db.car
const Seller = db.seller
const Transaction = db.transaction

const totalSoldCar = async (_, res) => {
  try {
    // const total_sold_car = await Transaction.find().count()
    const total_sold_car = await Transaction.count()

    return res.status(messages.status.statusSuccess).json({
      nTotalSoldCar: total_sold_car,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(messages.status.internalServerError)
      .json(messages.messages.failedToCountCar)
  }
}

const topCity = async (_, res) => {
  try {
    const oTopCity = await Transaction.findOne({
      logging: console.log,
      attributes: [
        // 'iTransactionId',
        'iSellerId',
        [sequelize.fn('count', sequelize.col('iTransactionId')), 'Total'],
      ],
      include: [
        {
          model: Seller,
          attributes: ['sCity'],
        },
      ],
      group: ['Seller.sCity'],
      order: [[sequelize.col('Total'), 'DESC']],
    })

    console.log(oTopCity)
    return res.status(messages.status.statusSuccess).json(oTopCity)
  } catch (error) {
    console.log(error)
    return res
      .status(messages.status.internalServerError)
      .json(messages.messages.failedToFindTopCity)
  }
}

const mostSoldCar = async (_, res) => {
  try {
    const oTopSoldCar = await Transaction.findOne({
      attributes: [
        'iCarId',
        [sequelize.fn('count', sequelize.col('iTransactionId')), 'Total'],
      ],
      include: { model: Car, attributes: ['sModel'] },
      group: ['Car.sModel'],
      order: [[sequelize.col('Total'), 'DESC']],
    })
    return res.status(messages.status.statusSuccess).json(oTopSoldCar)
  } catch (error) {
    console.log(error)
    return res
      .status(messages.status.internalServerError)
      .json(messages.messages.failedToFetchTopSoldCar)
  }
}

const mostSoldCarBrand = async (_, res) => {
  try {
    const oTopBrand = await Transaction.findOne({
      attributes: [
        [sequelize.fn('count', sequelize.col('iTransactionId')), 'Total'],
      ],
      include: {
        model: Car,
        attributes: [
          [sequelize.fn('count', sequelize.col('Car.iCarId')), 'No. of Model'],
        ],
        include: {
          model: Brand,
          attributes: ['sBrand'],
        },
      },
      group: ['Car.iBrandId'],
      order: [[sequelize.col('Total'), 'DESC']],
    })
    return res.status(messages.status.statusSuccess).json(oTopBrand)
  } catch (error) {
    console.log(error)
    return res
      .status(messages.status.internalServerError)
      .json(messages.messages.failedToFetchTopSoldBrand)
  }
}

module.exports = { totalSoldCar, topCity, mostSoldCar, mostSoldCarBrand }
