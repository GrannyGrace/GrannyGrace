const Sequelize = require('sequelize')
const Product = require('./product')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['pending', 'shipped', 'delivered', 'canceled']]
    }
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Order

/**
 * instanceMethods
 */
Order.prototype.orderShipped = function() {
  return this.status === 'shipped'
}

/**
 * classMethods
 */

/**
 * hooks
 */
