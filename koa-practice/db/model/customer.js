const Sequelize = require('sequelize')
const sequelize = require('../connect').sequelize
const Customer = sequelize.define('customer', {
  // id: {
  //   type: Sequelize.UUID,
  //   unique: true,
  //   primaryKey: true,
  //   allowNull: true
  // },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.ENUM('男', '女'),
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  fullAddress: {
    type: Sequelize.STRING,
    get() {
      return `${this.getDataValue('country')}${this.getDataValue(
        'city'
      )}${this.getDataValue('address')}`
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  }
})

Customer.sync({force:true})
module.exports = {
  Customer
}
