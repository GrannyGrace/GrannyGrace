const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [5, 5000],
        msg: 'Please write atleast 5 characters'
      }
    }
  },
  stars: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      min: 0,
      max: 5
    }
  }
})

module.exports = Review

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
