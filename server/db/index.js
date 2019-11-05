const db = require('./db')

// register models
require('./models')
console.log(process.env.NODE_ENV)
module.exports = db
