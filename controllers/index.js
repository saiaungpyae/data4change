const csvtojson = require('csvtojson')
const excelToJson = require('convert-excel-to-json')
const { mmrList, csvList, xlsxList } = require('../config')

const hearingDisability = async (req, res) => {
  try {
    const xlsxJson = excelToJson({
      sourceFile: xlsxList.HearingDisability
    })
    const DISHEAR = xlsxJson.DISHEAR
    const dataKey = Object.values(DISHEAR[2])
    const en = dataKey.reduce(
      (obj, k, i) => ({ ...obj, [k]: Object.values(DISHEAR[0])[i] }),
      {}
    )
    const mm = dataKey.reduce(
      (obj, k, i) => ({ ...obj, [k]: Object.values(DISHEAR[1])[i] }),
      {}
    )
    const csvJson = await csvtojson().fromFile(csvList.HearingDisability)

    let data = []
    let townships = {}
    let totals = {}

    for (const obj of csvJson) {
      const SR_PCODE = obj['SR_PCODE']
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
      const divisionImage = `${req.protocol}://${req.headers.host}/${
        mmrList[township['SR_PCODE']]
      }`
      const ext = {
        SR_PCODE: township['SR_PCODE'],
        SR_NAME: township['SR_NAME'],
        SR_MM_NAME: township['SR_MM_NAME'],
        DIVISION_IMAGE: divisionImage
      }

      townships[key].forEach(t => {
        delete t['SR_PCODE']
        delete t['SR_NAME']
        delete t['SR_MM_NAME']
      })

      ext['TOWNSHIPS'] = townships[key]
      data.push({
        ...ext,
        ...totals[key]
      })
    })

    res.status(200).json({ data, en, mm })
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

module.exports = {
  hearingDisability
}
