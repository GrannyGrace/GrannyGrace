'use strict'

const db = require('../server/db')
const {User, Order, Product, Review} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'don@email.com', password: '123'}),
    User.create({email: 'amy@email.com', password: '123', isAdmin: true}),
    User.create({
      email: 'smoochfest@email.com',
      password: '123',
      username: 'smoochfest'
    }),
    User.create({
      email: 'partyguy@email.com',
      password: '123',
      username: 'partyguy',
      isAdmin: true
    })
  ])

  //use faker to generate random users
  for (let i = 0; i < 100; i++) {
    await User.create({
      email: faker.internet.email(),
      password: faker.internet.password()
    })
  }

  // use faker to generate random products
  // console.log('TYPEOF ', typeof faker.commerce.product())
  // console.log('TYPEOF ', +faker.commerce.price())
  // console.log('TYPEOF ', typeof +faker.commerce.price())
  for (let i = 0; i < 100; i++) {
    let name = faker.commerce.productName()
    const product = await Product.findOne({where: {name: name}})
    const isExisted = product !== null
    //since Faker reuse product name, need to make sure that we don't create multiple of the same products
    if (!isExisted) {
      await Product.create({
        name: name,
        price: +faker.commerce.price()
      })
    }
  }

  const products = await Promise.all([
    Product.create({name: 'Product 1', price: 220}),
    Product.create({name: 'Product 2', price: 560})
  ])

  const orders = await Promise.all([
    Order.create({status: 'pending'}),
    Order.create({status: 'shipped'})
  ])
  const reviews = await Promise.all([
    Review.create({content: 'Great product!', stars: 5}),
    Review.create({content: 'BADDD product :(', stars: 1.3})
  ])

  await users[0].addReviews(reviews[0])
  await products[0].addReviews(reviews[0])
  await users[1].addReviews(reviews[1])
  await products[1].addReviews(reviews[1])

  // await users[0].setSession(sessions[0])
  await users[0].addOrders(orders)
  await orders[0].addProducts(products)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} users`)
  console.log(`seeded ${orders.length} users`)
  console.log(`seeded successfully in ${Object.keys(db)}`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
