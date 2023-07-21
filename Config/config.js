/* eslint-disable no-undef */
require('dotenv').config()

const oDev = {
  dev: {
    PORT: process.env.PORT || 4848,
  },
  prod: {
    PORT: process.env.PORT || 8888,
  },
}

module.exports = oDev[process.env.NODE_ENV || 'dev']