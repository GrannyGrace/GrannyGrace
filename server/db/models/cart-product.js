const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('CartProduct', {
  quantity: Sequelize.STRING
})

module.exports = CartProduct

//  quantity: Sequelize.INTEGER,
//defaultValue: 1
