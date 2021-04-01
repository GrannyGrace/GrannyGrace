const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 15'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '../generic_apple.jpg'
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['Apple', 'Food'],
    allowNull: false
  },
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 99,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
