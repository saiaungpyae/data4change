const path = require('path')

const filePath = path.join(__dirname, 'data')

const csvList = {
  HearingDisability: 'CS14_HearingDisability_20190510.csv'
}

const xlsxList = {
  HearingDisability: 'CS14_HearingDisability_20190510.xlsx'
}

const mmrList = {
  MMR001: 'Kachin.png',
  MMR002: 'Kayah.png',
  MMR003: 'Kayin.png',
  MMR004: 'Chin.png',
  MMR005: 'Sagaing.png',
  MMR006: 'Tanintharyi.png',
  MMR111: 'Bago.png',
  MMR009: 'Magway.png',
  MMR010: 'Mandalay.png',
  MMR011: 'Mon.png',
  MMR012: 'Rakhine.png',
  MMR013: 'Yangon.png',
  MMR222: 'Shan.png',
  MMR017: 'Ayeyarwady.png',
  MMR018: 'Naypyitaw.png'
}

Object.keys(csvList).map(key => {
  csvList[key] = path.join(filePath, csvList[key])
  xlsxList[key] = path.join(filePath, xlsxList[key])
})

Object.keys(mmrList).forEach(mmr => {
  mmrList[mmr] = `images/divisions/${mmrList[mmr]}`
})

module.exports = { csvList, xlsxList, mmrList }
