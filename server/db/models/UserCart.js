const Sequelize = require('sequelize')
const db = require('../db')

const UserCart = db.define('UserCart', {
  quantity: Sequelize.STRING
})

module.exports = UserCart
