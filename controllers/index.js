const csvtojson = require('csvtojson')
const { buddishBuildingsMonksNuns } = require('../config')

const getDivisionImage = (host, mmr) => {
  const mmrKeys = {
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
  Object.keys(mmrKeys).forEach(key => {
    mmrKeys[key] = `${host}/images/divisions/${mmrKeys[key]}`
  })
  return mmrKeys[mmr]
}

const APPLICATION_INFO = async (req, res) => {
  try {
    const json = await csvtojson().fromFile(buddishBuildingsMonksNuns)

    let data = []
    let townships = {}
    let totals = {}

    for (const obj of json) {
      const SR_PCODE = data['SR_PCODE']
      const keys = Object.keys(obj)

      townships[SR_PCODE] = townships[SR_PCODE] || []
      townships[SR_PCODE].push(obj)

      for (const key of keys) {
        const count = +obj[key]
        if (!isNaN(count)) {
          totals[SR_PCODE] = totals[SR_PCODE] || {}
          totals[SR_PCODE][key] = totals[SR_PCODE][key] || 0
          totals[SR_PCODE][key] += count
        }
      }
    }

    Object.keys(townships).forEach(key => {
      const township = townships[key][0]
      const divisionImage = getDivisionImage(
        `${req.protocol}://${req.headers.host}`,
        township['SR_PCODE']
      )
      const ext = {
        SR_PCODE: township['SR_PCODE'],
        SR_NAME: township['SR_NAME'],
        SR_MM_NAME: township['SR_MM_NAME'],
        DIVISION_IMAGE: divisionImage
      }
      ext['TOWNSHIPS'] = townships[key]
      data.push({
        ...ext,
        ...totals[key]
      })
    })

    res.status(200).json({ data })
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

module.exports = {
  APPLICATION_INFO
}
