const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('CartProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = CartProduct
