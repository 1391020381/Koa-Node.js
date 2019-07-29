module.exports = async (ctx, next) => {
  ctx.body = {
    status: 0
  }
  await next()
}
