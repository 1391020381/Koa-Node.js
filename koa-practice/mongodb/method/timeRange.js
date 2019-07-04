const TimeRange = require('../model/timeRange').TimeRange

async function getTimeRangeList(){
  return await TimeRange.find()
}

module.exports = {
  getTimeRangeList
}