const path = require('path')

const filePath = path.join(__dirname, 'data')
const json = {
  buddishBuildingsMonksNuns:
    'GAD1617_M8A_BuddhistBuildings_MonksNuns_20190513.csv'
}

Object.keys(json).map(key => {
  json[key] = path.join(filePath, json[key])
})

module.exports = json
