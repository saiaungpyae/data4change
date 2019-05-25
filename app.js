const express = require('express')
const cors = require('cors')
const glob = require('glob')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()

// CORS
app.use(cors())

// HTTP Logger
app.use(logger('dev'))

// Express body parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

// Set public
app.use(express.static(path.resolve('./public')))

// Global variables
global.appRoot = path.resolve(__dirname)

// Set Routing (used spread operator)
let routes = glob.sync('./routes/*.js')

routes.forEach((route, i) => {
  require(route)(app)
})

// 404
app.all('*', (req, res) => {
  res.status(404).json({ message: '404 Not Found' })
})

// Internal server error
app.use((err, req, res) => {
  res.status(500).json({ message: 'Something broke!', errors: err })
})

// Start Server
let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('serving on port ' + port)
})
