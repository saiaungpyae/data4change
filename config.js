const path = require('path')

const filePath = path.join(__dirname, 'data')
const csvList = {
  buddishBuildingsMonksNuns:
    'GAD1617_M8A_BuddhistBuildings_MonksNuns_20190513.csv'
}

Object.keys(csvList).map(key => {
  csvList[key] = path.join(filePath, csvList[key])
})

module.exports = csvList
