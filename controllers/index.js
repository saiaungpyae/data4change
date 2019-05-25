const csvtojson = require('csvtojson')
const { buddishBuildingsMonksNuns } = require('../config')

const APPLICATION_INFO = async (req, res) => {
  try {
    const json = await csvtojson().fromFile(buddishBuildingsMonksNuns)

    let data = []
    let townships = {}
    let totals = {}

    for (const data of json) {
      const SR_PCODE = data['SR_PCODE']
      townships[SR_PCODE] = townships[SR_PCODE] || []
      townships[SR_PCODE].push(data)

      const keys = Object.keys(data)
      for (const key of keys) {
        const count = +data[key]
        if (!isNaN(count)) {
          totals[SR_PCODE] = totals[SR_PCODE] || {}
          totals[SR_PCODE][key] = totals[SR_PCODE][key] || 0
          totals[SR_PCODE][key] += count
        }
      }
    }

    Object.keys(townships).forEach(key => {
      const township = townships[key][0]
      const ext = {
        SR_PCODE: township['SR_PCODE'],
        SR_NAME: township['SR_NAME'],
        SR_MM_NAME: township['SR_MM_NAME']
      }
      ext['townships'] = townships[key]
      data.push({
        ...ext,
        ...totals[key]
      })
    })

    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

module.exports = {
  APPLICATION_INFO
}
