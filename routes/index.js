const express = require('express')
const router = express.Router()
const { hearingDisability } = require('../controllers/index')

router.route('/hearing-disability').get(hearingDisability)

module.exports = app => {
  app.use('', router)
}
