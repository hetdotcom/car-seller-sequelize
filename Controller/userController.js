/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { db } = require('../Models/index')
const { trace } = require('../Routes/userRoutes')
const messages = require('../messages/index')
// const { Sequelize, DataTypes } = require('sequelize')

const User = db.user
const Post = db.post
const Paranoid_demo = db.paranoid_demo
const Car = db.car
const Transaction = db.transaction

const addUser = async (req, res) => {
  try {
    const user = await User.create({
      sUsername: req.body.sUsername,
      sFname: req.body.sFname,
      nAge: req.body.nAge,
      sPassword: req.body.sPassword,
      // sPassword: req.sHashedPass,
    })
    console.log(user.getDataValue('id'))
    console.log(user)

    return res.status(message.status.statusSuccess).json(user)
  } catch (error) {
    console.log('Error in adding new user', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

const getUser = async (req, res) => {
  try {
    // await User.findAll()
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })

    // const user = await User.findOrCreate({where: {sUsername: 'Ret'}})

    // const user = await User.findAll({
    //   attributes: [
    //     'sUsername',
    //     [sequelize.fn('COUNT', sequelize.col('id'), 'col_count')],
    //   ],
    // })

    // const user = await User.findAll(
    //   {
    //     attributes: ['sUsername', ['id', 'col_count']],
    //   },
    //   { raw: true, logging: console.log }
    // )

    const user = await User.findAll({
      // attributes: ['sType', 'sDescription'],
      include: { all: true },
      // include: { model: Post, as: 'Instruments' },
      logging: console.log,
      where: {},
      // raw:true /// query here -------------------------------------------------------
    })

    // const user = await User.findByPk(1, { raw: true })

    // const user = await User.findAll({
    //   logging: console.log,
    //   raw: true,
    //   // where: {
    //   //   id: 1,
    //   // },
    // })

    // const user = await Paranoid_demo.findAll({ raw: true , paranoid: false})
    console.log(user)

    return res.status(message.status.statusSuccess).json({ user: user })
  } catch (error) {
    console.log('Error in adding new user', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

const removeUser = async (req, res) => {
  try {
    // ---------------------------- Paranoid demo ----------------------------------------
    // const user = await Paranoid_demo.destroy({
    //   logging: console.log,
    //   raw: true,
    //   where: {
    //     id: 1,
    //   },
    // })

    // const user = await Paranoid_demo.restore({
    //   logging: console.log,
    //   raw: true,
    //   where: {
    //     id: 1,
    //   },
    // })

    // console.log(user)
    // ------------------------------------------------------------------------------------

    const user = await User.destroy({
      logging: console.log,
      raw: true,
      where: {
        id: 1,
      },
    })
    console.log(user)

    return res.status(message.status.statusSuccess).json({ user: user })
  } catch (error) {
    console.log('Error in adding new user', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.update(
      { ...req.body }, // { ...req.body, createdAt: Date.now() }
      {
        where: {
          sUsername: 'Het',
        },
      }
    )
    console.log(user)

    return res.status(message.status.statusSuccess).json({ user: user })
  } catch (error) {
    console.log('Error in adding new user', error)
    return res
      .status(message.status.internalServerError)
      .json(message.messages.userNotAdded)
  }
}

const buyCar = async (req, res) => {
  try {
    //  const oCar = await Car.findOne({
    //    logging: console.log,
    //    where: {
    //     iCarId: req.body.iCarId
    //    },
    //    raw:true /// query here -------------------------------------------------------
    //  })
    // console.log(oCar, 'Car')

    // req.body.sCar = iCarId._id
    console.log(req.body)


    // const oBuyCar = await new  (req.body).save()
    const transaction = await Transaction.create({
      iBuyerId: req.body.iBuyerId,
      iSellerId: req.body.iSellerId,
      iCarId: req.body.iCarId,
     
      // sPassword: req.sHashedPass,
    })
    console.log(transaction.getDataValue('id'))
    console.log(transaction)

    res.status(messages.status.statusSuccess).json({
      // oSellDetails: transaction,
      message: messages.messages.successToBuyCar,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(messages.status.internalServerError)
      .json(messages.messages.carNotAdded)
  }
}

module.exports = { addUser, getUser, removeUser, updateUser, buyCar }
