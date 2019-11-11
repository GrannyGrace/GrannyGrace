const Sequelize = require('sequelize')
const Product = require('./product')
const db = require('../db')

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  sid: {
    type: Sequelize.STRING
  }
})

module.exports = Cart
