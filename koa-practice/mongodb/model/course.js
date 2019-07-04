const mongoose = require('../connect').mongoose
const timeRangeSchema = require('./timeRange').timeRangeSchema
const courseSchema = new mongoose.Schema({
  name: String,
  startTime: timeRangeSchema,
  endTime: timeRangeSchema,
  weekday:{
    type:Number,
    max:6,
    min:0
  }
})

const Course = mongoose.model('Course', courseSchema)
module.exports = {
  courseSchema,
  Course
}
