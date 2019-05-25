const csvtojson = require('csvtojson')
const excelToJson = require('convert-excel-to-json')
const {
  mmrList,
  csvList,
  xlsxList,
  imageList,
  categoryList
} = require('../config')
const townshipList = require('../data/townships.json')

const getDivisions = async (req, res) => {
  try {
    const divisions = Object.keys(mmrList).reduce((result, key) => {
      result.push({
        mmr: key,
        name: mmrList[key]['en'],
        name_mm: mmrList[key]['mm'],
        image: `${req.protocol}://${req.headers.host}/${imageList[key]}`
      })
      return result
    }, [])
    return res.status(200).json({ data: divisions })
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message })
  }
}

const getCategories = async (req, res) => {
  try {
    const { divisionId } = req.params
    const categories = {
      ids: categoryList,
      townships: townshipList[divisionId]
    }
    return res.status(200).json({ data: categories })
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message })
  }
}

const getDataSet = async (req, res) => {
  try {
    const { division, filter } = req.query
    const { dataSetName } = req.params
    if (!xlsxList[dataSetName]) {
      return res.status(404).json({ message: 'Not found' })
    }
    const xlsxJson = excelToJson({
      sourceFile: xlsxList[dataSetName]
    })
    const DISHEAR = xlsxJson[Object.keys(xlsxJson)[0]]
    const dataKey = Object.values(DISHEAR[2])
    const defaultArr = [
      'SR_PCODE',
      'SR_NAME',
      'SR_MM_NAME',
      'TS_PCODE',
      'TS_NAME',
      'TS_MM_NAME'
    ]
    const filterArr = filter ? [...JSON.parse(filter), ...defaultArr] : false

    const en = dataKey.reduce(
      (obj, k, i) => ({ ...obj, [k]: Object.values(DISHEAR[0])[i] }),
      {}
    )
    const mm = dataKey.reduce(
      (obj, k, i) => ({ ...obj, [k]: Object.values(DISHEAR[1])[i] }),
      {}
    )

    const csvJson = await csvtojson().fromFile(csvList[dataSetName])

    let data = []
    let townships = {}
    let totals = {}

    for (const obj of csvJson) {
      const SR_PCODE = obj['SR_PCODE']
      const keys = Object.keys(obj)

      if (division && division !== SR_PCODE) continue

      townships[SR_PCODE] = townships[SR_PCODE] || []
      townships[SR_PCODE].push(obj)
      for (const key of keys) {
        if (filterArr && !filterArr.includes(key)) delete obj[key]

        const count = +obj[key]

        if (!isNaN(count)) {
          totals[SR_PCODE] = totals[SR_PCODE] || {}
          totals[SR_PCODE][key] = totals[SR_PCODE][key] || 0
          totals[SR_PCODE][key] += count
        }
      }
    }

    let divisions = []
    Object.keys(townships).forEach(key => {
      const township = townships[key][0]
      const divisionImage = `${req.protocol}://${req.headers.host}/${
        imageList[township['SR_PCODE']]
      }`
      const ext = {
        SR_PCODE: township['SR_PCODE'],
        SR_NAME: township['SR_NAME'],
        SR_MM_NAME: township['SR_MM_NAME'],
        DIVISION_IMAGE: divisionImage
      }
      townships[key].forEach(t => {
        const tKey = Object.keys(t)
        divisions.push({
          SR_PCODE: t[tKey.shift()],
          SR_NAME: t[tKey.shift()],
          SR_MM_NAME: t[tKey.shift()],
          TS_PCODE: t[tKey.shift()],
          TS_NAME: t[tKey.shift()],
          TS_MM_NAME: t[tKey.shift()]
        })
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
  getDivisions,
  getCategories,
  getDataSet
}
