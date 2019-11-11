const Sequelize = require('sequelize')
const db = require('../db')

const UserCart = db.define('UserCart', {
  quantity: Sequelize.STRING
})

module.exports = UserCart

// const UserCart = db.define('UserCart', {
//   quantity: Sequelize.INTEGER,
//   defaultValue: 1
// })
