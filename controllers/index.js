const csvtojson = require('csvtojson')
const excelToJson = require('convert-excel-to-json')
const { mmrList, csvList, xlsxList } = require('../config')

const getDivisions = async (req, res) => {
  const divisions = Object.keys(mmrList).reduce((result, key) => {
    result.push({
      mmr: key,
      name: mmrList[key]
        .split('.')[0]
        .split('/')
        .slice(-1)
        .join('')
    })
    return result
  }, [])
  return res.status(200).json({ data: divisions })
}

const getCategories = async (req, res) => {
  const categories = Object.keys(csvList).reduce((result, key) => {
    result.push({
      id: key
    })
    return result
  }, [])
  return res.status(200).json({ data: categories })
}

const getDataSet = async (req, res) => {
  try {
    const { dataSetName } = req.params
    const { division, filter } = req.query
    const defaultArr = ['TS_PCODE', 'TS_NAME', 'DISHEAR_N_T']
    const filterArr = filter ? [...JSON.parse(filter), ...defaultArr] : false

    if (!xlsxList[dataSetName]) {
      return res.status(404).json({ message: 'Not found' })
    }
    const xlsxJson = excelToJson({
      sourceFile: xlsxList[dataSetName]
    })
    const DISHEAR = xlsxJson[Object.keys(xlsxJson)[0]]
    const dataKey = Object.values(DISHEAR[2])
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
    let township = {}

    for (const obj of csvJson) {
      const SR_PCODE = obj['SR_PCODE']
      const keys = Object.keys(obj)

      if (division && division !== SR_PCODE) continue

      if (!townships[SR_PCODE]) {
        townships[SR_PCODE] = []
        township = JSON.parse(JSON.stringify(obj))
      }
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

    Object.keys(townships).forEach(key => {
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
  getDivisions,
  getCategories,
  getDataSet
}
