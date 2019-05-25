const express = require('express')
const router = express.Router()
const { APPLICATION_INFO } = require('../controllers/index')

router.route('/').get(APPLICATION_INFO)

module.exports = app => {
  app.use('', router)
}
