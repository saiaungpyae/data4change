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
  'hearing-disability': 'CS14_HearingDisability_20190510.csv',
  'remembering-disability': 'CS14_RememberingDisability_20190510.csv',
  'seeing-disability': 'CS14_SeeingDisability_20190510.csv',
  'walking-disability': 'CS14_WalkingDisability_20190510.csv',
  'hospitals': 'GAD1617_M7A_Hospitals_20190514.csv', // prettier-ignore
  'clinics': 'GAD1617_M7B_Clinics_20190514.csv', // prettier-ignore
  'rural-health': 'GAD1617_M7C_RuralHealth_20190514.csv',
  'health-care-personal': 'GAD1617_M7D_HealthCarePersonal_20190514.csv',
  'most-disease': 'GAD1617_M7E_MostDiseaseInRegion_20190514.csv',
  'hiv-aids': 'GAD1617_M7F_HIVAIDSPersonsanddeaths_20190514.csv'
}
const xlsxList = {
  'hearing-disability': 'CS14_HearingDisability_20190510.xlsx',
  'remembering-disability': 'CS14_RememberingDisability_20190510.xlsx',
  'seeing-disability': 'CS14_SeeingDisability_20190510.xlsx',
  'walking-disability': 'CS14_WalkingDisability_20190510.xlsx',
  'hospitals': 'GAD1617_M7A_Hospitals_20190514.xlsx', // prettier-ignore
  'clinics': 'GAD1617_M7B_Clinics_20190514.xlsx', // prettier-ignore
  'rural-health': 'GAD1617_M7C_RuralHealth_20190514.xlsx',
  'health-care-personal': 'GAD1617_M7D_HealthCarePersonal_20190514.xlsx',
  'most-disease': 'GAD1617_M7E_MostDiseaseInRegion_20190514.xlsx',
  'hiv-aids': 'GAD1617_M7F_HIVAIDSPersonsanddeaths_20190514.xlsx'
}

Object.keys(csvList).map(key => {
  csvList[key] = path.join(filePath, csvList[key])
  xlsxList[key] = path.join(filePath, xlsxList[key])
})

Object.keys(mmrList).forEach(mmr => {
  mmrList[mmr] = `images/divisions/${mmrList[mmr]}`
})

module.exports = { csvList, xlsxList, mmrList }
