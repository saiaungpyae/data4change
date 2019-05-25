const express = require('express')
const router = express.Router()
const { hearingDisability } = require('../controllers/index')

router.route(['/:dataSetName']).get(hearingDisability)

module.exports = app => {
  app.use('/dataset', router)
}
