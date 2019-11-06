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
  for (let i = 0; i < 100; i++) {
    let name = faker.commerce.productName()
    const existedProduct = await Product.findOne({where: {name: name}})
    const isExisted = existedProduct !== null
    //since Faker reuse product name, need to make sure that we don't create multiple of the same products
    if (!isExisted) {
      let product = await Product.create({
        name: name,
        price: +faker.commerce.price()
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
  for (let i = 0; i < 100; i++) {
    let review = await Review.create({
      content: faker.lorem.sentences(),
      stars: Math.floor(Math.random() * 6)
    })
    allReviews.push(review)
  }

  //SET ASSOCIATION
  for (let i = 0; i < 100; i++) {
    console.log(i)
    await users[i].addReviews(allReviews[i])
    await allProducts[i].addReviews(allReviews[i])
  }

  // await users[1].addReviews(allReviews[1])
  // await users[1].addReviews(allReviews[2])

  // const allReviews = await Promise.all(
  //   tempReviews
  // [
  //   Review.create({content: 'Great product!', stars: 5}),
  //   Review.create({content: 'BADDD product :(', stars: 1.3})
  // ]
  // )

  // await users[0].addReviews(reviews[0])
  // await products[0].addReviews(reviews[0])
  // await users[1].addReviews(reviews[1])
  // await products[1].addReviews(reviews[1])

  // await users[0].addOrders(orders)
  // await orders[0].addProducts(products)

  // for (let i = 0; i < 100; i++) {
  //   await users[i].addReviews(allReviews[i])
  // }

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
