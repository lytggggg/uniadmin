// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "USCC": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "唯一标识"
  },
  "runstatus": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "运营状态"
  },
  "worknum": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "从业人员数"
  },
  "totolmoney": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "旅游总收入"
  },
  "tikitmoney": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "门票收入"
  },
  "jiedaipeoplenum": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "接待游客人次"
  },
  "freetikitnum": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "免票人次"
  },
  "reportID": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "填报人工号"
  },
  "month": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "label": "月份"
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
