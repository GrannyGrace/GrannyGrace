const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['pending', 'shipped', 'delivered']]
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
