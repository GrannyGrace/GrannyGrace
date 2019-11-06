const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: Sequelize.STRING
})

module.exports = Cart
