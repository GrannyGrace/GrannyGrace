/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {User, Order, Product, Review, Cart} = require('../server/db/models')
const faker = require('faker')
const axios = require('axios')
const fruitdb = require('../public/fruitdb.json')

async function seed() {
  await db.sync({force: true}) //forcefully drop existing tables(if any) and creates new ones. creates if they don't exist at all.
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
  const HoneyCrisp = await Promise.all([
    Product.create({
      name: 'Honey Crisp',
      description: 'Refreshing, Crunchy, and Sweet!',
      availability: false,
      price: 220,
      category: ['Apple', 'HoneyCrisp'],
      inventory: 10
    })
  ])

  const allProducts = []
  for (let i = 0; i < 100; i++) {
    // let name = faker.commerce.productName()
    // const existedProduct = await Product.findOne({where: {name: name}})
    // const isExisted = existedProduct !== null
    //since Faker reuse product name, this makes sure that we don't create multiple of the same products
    // if (!isExisted) {
    // let name = fruitdb.vegetables[i]
    let product = await Product.create({
      name:
        fruitdb.vegetables[i][0].toUpperCase() +
        fruitdb.vegetables[i].substr(1),
      price: +faker.commerce.price(),
      category: [
        faker.commerce.productMaterial(),
        faker.commerce.productMaterial()
      ],
      quantity: 12
    })
    allProducts.push(product)
    // }
  }

  //SEED ORDERS
  const orders = []
  let randomOrderStatus = ['pending', 'shipped', 'delivered', 'canceled']
  for (let i = 0; i < 90; i++) {
    let order = await Order.create({
      status: randomOrderStatus[Math.floor(Math.random() * 4)],
      price: Math.floor(Math.random() * 1000),
      userId: Math.floor(Math.random() * 20 + 1),
      lockedProducts: allProducts.slice(i, i + 7)
    })

    orders.push(order)
  }
  // console.log('allProducts.slice(i, i + 7)', allProducts.slice(1, 2 + 7))
  //SEED CART
  // const cart = await Promise.all([
  //   Cart.create({
  //     id: 1,
  //     userId: 1
  //   })
  // ])

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

  // await cart[0].addProducts(allProducts[37])
  // await cart[0].addProducts(allProducts[23])
  // await cart[0].addProducts(allProducts[12])

  await orders[0].addProducts(allProducts[32])
  await orders[0].addProducts(allProducts[13])
  await orders[0].addProducts(allProducts[1])
  await orders[1].addProducts(allProducts[22])
  await orders[1].addProducts(allProducts[2])

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
