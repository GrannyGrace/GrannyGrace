const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('CartProduct', {
  quantity: Sequelize.INTEGER
})

module.exports = CartProduct
