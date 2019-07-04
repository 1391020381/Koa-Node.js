const mongoose = require('../connect').mongoose

const timeRangeSchema = new mongoose.Shema({
  hour:{
    type:Number,
    max:24,
    min:8
  },
  minute:{
    type:Number,
    max:59,
    min:0
  },
  time:{
    type:Number,
    get(){
     return this.get('hour')*100 + this.get('minute') 
    }
  }
})
const TimeRange = mongoose.model('TimeRange',timeRangeSchema)

moudule.exports = {
  timeRangeSchema,
  TimeRange
}