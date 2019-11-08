'use strict'

const db = require('../server/db')
const {User, Order, Product, Review} = require('../server/db/models')
const faker = require('faker')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const Amy = await Promise.all([
    User.create({email: 'amy@email.com', password: '123', isAdmin: true})
  ])

  //SEED USERS - use faker to generate random users
  const users = []
  for (let i = 0; i < 100; i++) {
    let user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    users.push(user)
  }

  //SEED PRODUCTS use faker to generate random products
  const product1 = await Promise.all([
    Product.create({name: 'Product 1', price: 220})
  ])

  const allProducts = []
  for (let i = 0; i < 200; i++) {
    let name = faker.commerce.productName()
    const existedProduct = await Product.findOne({where: {name: name}})
    const isExisted = existedProduct !== null
    //since Faker reuse product name, this makes sure that we don't create multiple of the same products
    if (!isExisted) {
      let product = await Product.create({
        name: name,
        price: +faker.commerce.price(),
        category: faker.commerce.productMaterial(),
        quantity: 5
      })
      allProducts.push(product)
    }
  }

  //SEED ORDERS
  const orders = await Promise.all([
    Order.create({status: 'pending'}),
    Order.create({status: 'shipped'})
  ])

  //SEED REVIEWS
  // use faker to generate random reviews
  const allReviews = []
  for (let i = 0; i < 200; i++) {
    let review = await Review.create({
      title: faker.lorem.sentence(),
      content: faker.lorem.sentences(),
      stars: Math.floor(Math.random() * 6)
    })
    allReviews.push(review)
  }

  //SET ASSOCIATION
  for (let i = 0; i < 100; i++) {
    await users[i].addReviews(allReviews[i])
    await allProducts[i].addReviews(allReviews[i])
    await allProducts[i].addReviews(allReviews[i + 100])
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${allProducts.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${allReviews.length} reviews`)
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
