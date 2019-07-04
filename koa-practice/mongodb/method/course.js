const Course = require('../model/course').Course

async function getCourseList(){
  return await Course.find().sort({
    'startTime.time':1
  })
}

async function getCourseBy(id){
  return await Course.findById(id)
}

async function getCourseByTime(start,end,weekday){
  return await Course.find({
    weekday:weekday
  })
}