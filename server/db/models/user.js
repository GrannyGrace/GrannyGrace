const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: null
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  sessionId: Sequelize.STRING,
  isGuest: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  console.log('setSaltAndPassword===', user)
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeValidate(user => {
  if (!user.username) {
    user.username = user.email
  }
})

User.beforeCreate(setSaltAndPassword)

User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

User.beforeUpdate((a, b, c) =>
  console.log('aauuuuuuuuu', a, 'bbbbbb', b, 'cccccc', c)
)

User.beforeBulkUpdate(a =>
  console.log(
    'buuuuuuuuuu',
    a,
    'pwdddd',
    a.password,
    'pwdfunccc',
    a.password(),
    'changeddd',
    a.changed('password')
  )
)

//c4d78082b08a7ed3c9ebdbfe886776a7ef98561492e37536b7ba0cf23df4b160
