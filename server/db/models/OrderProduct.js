const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('OrderProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = OrderProduct
