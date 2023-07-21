/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const {
  totalSoldCar,
  // topCity,
  // mostSoldCar,
  // mostSoldCarBrand,
} = require('../Controller/adminController')

router.get('/total-car', totalSoldCar)
// router.get('/top-city', topCity)
// router.get('/most-sold-car', mostSoldCar)
// router.get('/most-sold-car-brand', mostSoldCarBrand)

module.exports = router
