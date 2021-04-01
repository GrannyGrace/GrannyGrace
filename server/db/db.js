const pg = require('pg')
pg.defaults.ssl = true

const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  'postgres://xnyvwcoqvqdzux:d25ad81f51fcd5a57125f3afa229e94555ccf982181894790c89c0e00b451ae1@ec2-52-71-231-180.compute-1.amazonaws.com:5432/d35t9uujtqmvdm', //process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
