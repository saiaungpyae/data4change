const express = require('express')
const router = express.Router()
const {
  getDivisions,
  getCategories,
  getDataSet
} = require('../controllers/index')

router.route('/divisions').get(getDivisions)
router.route('/divisions/:divisionId/categories').get(getCategories)
router.route('/dataset/:dataSetName').get(getDataSet)

module.exports = app => {
  app.use('', router)
}
