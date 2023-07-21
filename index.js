/* eslint-disable no-undef */
require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')
const corsOption = {
  origin: 'https://localhost:4848',
}
app.use(cors(corsOption))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const message = require('./messages')
const config = require('./Config/config')

require('./Models/index')

// ---------------------------- Morgan ----------------------------
const morgan = require('morgan')
morgan.token('splitter', () => {
  return '\x1b[36m--------------------------------------------\x1b[0m\n'
})
morgan.token('statusColor', (_, res) => {
  const status = (
    typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent
  )
    ? res.statusCode
    : undefined

  const color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0 // no color

  return '\x1b[' + color + 'm' + status + '\x1b[0m'
})
app.use(
  morgan(
    ':splitter\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length]'
  )
)

// ---------------------------- Health check ---------------------------------------
app.get('/ping', (_, res) => {
  return res.status(200).json({
    sMessage: 'Pong!!',
  })
})

// --------------------------- User routes -----------------------------------------
// app.use('/user', require('./routes/userRoutes'))
// app.use('/post', require('./routes/postRoutes'))
// app.use('/tag', require('./routes/tagRoutes'))
// app.use('/post_tag', require('./routes/post_tagRoutes'))


// app.use('/api/brands', require('./Routes/brandRoutes'))
// app.use('/api/cars', require('./Routes/carRoutes'))
app.use('/api/users', require('./Routes/userRoutes'))
// app.use('/api/sellers', require('./Routes/sellerRoutes'))
app.use('/api/admin', require('./Routes/adminRoutes'))

// ------------------------------ Server -------------------------------------------
app.listen(4848, () => {
  console.log('Server started listening on http://127.0.0.1:' + config.PORT)
})

// ---------------------- Error Handling Routes ------------------------------------
app.all('*', (_, res) => {
  return res.status(message.status.notFound).json(message.messages.notFound)
})
