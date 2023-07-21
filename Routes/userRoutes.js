/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()

const { verifyCity, isCarPresent } = require('../Middlewares/userMiddleware')

const {
  addUser,
  getUser,
  removeUser,
  updateUser,
  // addBuyer,
  buyCar,
} = require('../Controller/userController')

// const { hashPass } = require('../middleware/userMiddleware')

// router.post('/addUser', hashPass, addUser)
router.post('/addUser', addUser)
router.get('/getUser', getUser)
router.delete('/removeUser', removeUser)
router.patch('/updateUser', updateUser)

// router.post('/add-buyer', addBuyer)
router.post('/buy-car', verifyCity, isCarPresent, buyCar)

module.exports = router
