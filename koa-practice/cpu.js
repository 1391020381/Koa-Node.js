const pidusage = require('pidusage')

let previousCpuUsage = process.cpuUsage()  // 记录 上一次的 usage
let previousHrTime = process.hrtime()   // 记录上一次的 hrtime

setInterval(()=>{
    const currentCpuUsage = process.cpuUsage(previousCpuUsage)  // 根据上次信息采集本次
    const currentHrTime = process.hrtime(previousHrTime)   // 得到本次的hrtime
    const duration = currentHrTime[0]*1e6 + currentHrTime[1] / 1e3  // 根据 hrtime计算时间
    previousTime = currentHrTime
    previousCpuUsage = currentCpuUsage
    const cpuPercent = {
        user:currentCpuUsage.user / duration, // cpu 用户资源占比
        system:currentCpuUsage.system /duration // cpu系统资源占比
    }
    console.log(cpuPercent)
},1000)

setInterval(()=>{
    pidusage(process.pid,(err,stats)=>{
        console.log(stats)
    })
},1000)