const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['cart', 'pending', 'shipped', 'delivered']]
    }
  },
  price: Sequelize.INTEGER
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
