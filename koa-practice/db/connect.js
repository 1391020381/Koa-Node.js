const Sequelize = require('sequelize')
const { name, user, password, host, dialect } = require('../config').db

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect
})

function closeSequelize() {
  sequelize.close()
}

module.exports = {
  sequelize,
  closeSequelize
}
