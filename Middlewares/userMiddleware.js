/* eslint-disable no-undef */
const messages = require('../Messages')
const { db } = require('../Models/index')
const User = db.user
const Car = db.car
const Seller = db.seller

const { hash } = require('../Helper/hashPass')

const hashPass = async (req, res, next) => {
  const sHashedPass = await hash(req.body.sPassword)
  console.log(sHashedPass)
  req.sHashedPass = sHashedPass
  next()
  console.log('sHashedPass')
}

const verifyCity = async (req, res, next) => {
  try {
    const oSeller = await Seller.findOne({
      logging: console.log,
      where: {
        iSellerId: req.body.iSellerId,
      },
      raw: true,
    })
    // console.log(oSeller, 'Seller')

    const oUser = await User.findOne({
      logging: console.log,
      where: {
        iUserId: req.body.iBuyerId,
      },
      raw: true,
    })
    // console.log(oUser, 'User')

    if (oSeller.sCity == oUser.sCity) {
      next()
    } else {
      res
        .status(messages.status.badrequest)
        .json(messages.messages.failedToBuyCar)
    }
  } catch (error) {
    console.log(error)
  }
}

const isCarPresent = async (req, res, next) => {
  try {
    const oCar = await Car.findOne({
      logging: console.log,
      where: {
        iCarId: req.body.iCarId,
      },
      raw: true, /// query here -------------------------------------------------------
    })
    console.log(oCar, 'Car')

    const oSeller = await Seller.findOne({
      logging: console.log,
      include: [
        {
          model: Car,
          through: { attributes: [] },
          attributes: ['iCarId'],
          where: { iCarId: req.body.iCarId },
        },
      ],
      where: {
        iSellerId: req.body.iSellerId,
      },
    })
    console.log(oSeller, 'oSeller')

    if (oSeller != null) {
      next()
    } else {
      res
        .status(messages.status.badrequest)
        .json(messages.messages.sellerNotMatched)
    }
  } catch (error) {
    console.log(error)
    res
      .status(messages.status.internalServerError)
      .json(messages.messages.failedToBuyCar)
  }
}
module.exports = { verifyCity, isCarPresent, hashPass }
