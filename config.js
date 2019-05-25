const path = require('path')

const filePath = path.join(__dirname, 'data')
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
const csvList = {
  HearingDisability: 'CS14_HearingDisability_20190510.csv',
  RememberingDisability: 'CS14_RememberingDisability_20190510.csv',
  SeeingDisability: 'CS14_SeeingDisability_20190510.csv',
  WalkingDisability: 'CS14_WalkingDisability_20190510.csv',
  Hospitals: 'GAD1617_M7A_Hospitals_20190514.csv',
  Clinics: 'GAD1617_M7B_Clinics_20190514.csv',
  RuralHealth: 'GAD1617_M7C_RuralHealth_20190514.csv',
  HealthCarePersonal: 'GAD1617_M7D_HealthCarePersonal_20190514.csv'
}
const xlsxList = {
  HearingDisability: 'CS14_HearingDisability_20190510.xlsx',
  RememberingDisability: 'CS14_RememberingDisability_20190510.xlsx',
  SeeingDisability: 'CS14_SeeingDisability_20190510.xlsx',
  WalkingDisability: 'CS14_WalkingDisability_20190510.xlsx',
  Hospitals: 'GAD1617_M7A_Hospitals_20190514.xlsx',
  Clinics: 'GAD1617_M7B_Clinics_20190514.xlsx',
  RuralHealth: 'GAD1617_M7C_RuralHealth_20190514.xlsx',
  HealthCarePersonal: 'GAD1617_M7D_HealthCarePersonal_20190514.xlsx'
}

Object.keys(csvList).map(key => {
  csvList[key] = path.join(filePath, csvList[key])
  xlsxList[key] = path.join(filePath, xlsxList[key])
})

Object.keys(mmrList).forEach(mmr => {
  mmrList[mmr] = `images/divisions/${mmrList[mmr]}`
})

module.exports = { csvList, xlsxList, mmrList }
