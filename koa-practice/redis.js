const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')
client.on('error', function(err) {
  console.log('Error' + err)
})
client.set('name', 'ikcamp', redis.print) // redis.print的作用是打印设置数据的结果

client.get('name', function(err, value) {
  if (err) {
    throw err
  } else {
    console.log('Name:' + value)
  }
})

client.hmset('ikcamp', {
  item: 'koaDemo',
  chapter: 'redisDemo'
})
client.hkeys('ikcamp', function(err, replies) {
  replies.forEach(function(reply, i) {
    console.log(i + ':', reply)
  })
})
client.lpush('ikcamp1', 'koa', redis.print)
client.lpush('ikcamp1', 'redisDemo', redis.print)
client.lrange('ikcamp1', 0, -1, function(err, items) {
  if (err) {
    throw err
  } else {
    items.forEach(function(item, i) {
      console.log(`(${item})`)
    })
  }
})

client.sadd('address', '上海', redis.print)
client.sadd('address', '北京', redis.print)
client.sadd('address', '北京', redis.print)
client.sadd('address','武汉')
client.smembers('address', function(err, members) {
  if (err) {
    throw err
  } else {
    console.log(members)
  }
})
module.exports = {
  client
}
