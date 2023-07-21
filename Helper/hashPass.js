const bcrypt = require('bcrypt')
const saltRounds = 8

const hash = async (password) => {
  return new Promise(() => {
    if (!password || typeof password !== 'string') {
      throw 'Password must be a string.'
    }
    const hashedPass = bcrypt
      .hash(password, saltRounds)
      .then((hashedPass) => {
        console.log('hash: ', hashedPass)
      })
      .catch((err) => console.error(err.message))
      return hashedPass
  })
}

module.exports = { hash }
