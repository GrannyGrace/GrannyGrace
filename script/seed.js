/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {
  User,
  Order,
  Product,
  Review,
  Cart,
  CartProduct
} = require('../server/db/models')
const faker = require('faker')
const axios = require('axios')
const fruitdb = require('../public/fruitdb.json')
const gis = require('g-i-s')

async function seed() {
  await db.sync({force: true}) //forcefully drop existing tables(if any) and creates new ones. creates if they don't exist at all.
  console.log('db synced!')

  //SEED USERS - use faker to generate random users

  const amy = await User.create({
    email: 'amy@email.com',
    password: '123',
    isAdmin: true
  })
  const amyCart = await Cart.create()
  await amy.setCart(amyCart)

  const users = await Promise.all(
    Array(100)
      .fill()
      .map(async () => {
        const user = await User.create({
          email: faker.internet.email(),
          password: faker.internet.password()
        })
        const newCart = await Cart.create()
        await user.setCart(newCart)
        return user
      })
  )

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

  const allProducts = await Promise.all(
    Array(100)
      .fill()
      .map((x, i) => {
        // let name = faker.commerce.productName()
        // const existedProduct = await Product.findOne({where: {name: name}})
        // const isExisted = existedProduct !== null
        //since Faker reuse product name, this makes sure that we don't create multiple of the same products
        // if (!isExisted) {
        // let name = fruitdb.vegetables[i]
        return Product.create({
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
      })
  )

  await Promise.all(
    allProducts.map(element => {
      return new Promise((resolve, reject) => {
        gis(element.dataValues.name, async (error, results) => {
          if (error) {
            console.log('errorrr in log rrr==>>>', error)
          } else {
            try {
              if (results[0]) {
                console.log('One url', results[0].url)
                // const newUrl = results[0].url
                await element.update({imageUrl: results[0].url})
              } else {
                console.log('image not available')
              }
            } catch (err) {
              console.log('BAD CATCH ERR', err)
            }
            // eslint-disable-next-line no-lonely-if
          }
          resolve()
        })
      })
    })
  )
  // const allCarts = []
  // users.forEach(async (user, ind) => {
  //   try {
  //     const newCart = await Cart.findOne({
  //       where: {
  //         userId: user.id
  //       }
  //     })
  //     await newCart.addProduct(allProducts[ind])
  //     await CartProduct.update(
  //       {quantity: 1},
  //       {
  //         where: {
  //           productId: allProducts[ind].id,
  //           cartId: newCart.id
  //         }
  //       }
  //     )
  //   } catch (error) {
  //     throw error
  //   }
  // })
  //SEED ORDERS
  // const orders = []
  // let randomOrderStatus = ['pending', 'shipped', 'delivered', 'canceled']
  // for (let i = 0; i < 90; i++) {
  //   let myCart = await Cart.findByPk(i + 1)
  //   await myCart.addProduct(allProducts[i])
  //   myCart = await Cart.findByPk(i + 1, {
  //     include: [
  //       {
  //         model: Product,
  //         include: [Cart]
  //       }
  //     ]
  //   })
  //   let order = await Order.create({
  //     status: randomOrderStatus[Math.floor(Math.random() * 4)],
  //     price: Math.floor(Math.random() * 1000),
  //     userId: Math.floor(Math.random() * 5 + 1),
  //     lockedProducts: myCart.products
  //   })

  //   orders.push(order)
  // }

  // orders.forEach((ord,ind)=>{
  //    await ord.addProduct(allProducts[ind])
  //    await CartProduct.findAll({where:{
  //      productId:allProducts[ind].id,
  //      cart
  //    }})
  // })

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
  const allReviews = await Promise.all(
    Array(100)
      .fill()
      .map(async () => {
        return Review.create({
          title: faker.lorem.sentence(),
          content: faker.lorem.sentences(),
          stars: Math.floor(Math.random() * 6)
        })
      })
  )

  //SET ASSOCIATION
  await Promise.all(
    Array(100)
      .fill()
      .map(async (x, i) => {
        await users[i].addReviews(allReviews[i])
        await allProducts[i].addReviews(allReviews[i])
        await allProducts[i].addReviews(allReviews[i + 100])
      })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${allProducts.length} products`)
  //console.log(`seeded ${orders.length} orders`)
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
    console.error('error==>>', err)
    process.exitCode = 1
  } finally {
    //set time out 30 second because g-i-s needs time to fetch all photos
    //increase timer if photos dont get fetched before timer ends
    console.log('closing db connection in 30 seconds')

    setTimeout(function() {
      db.close()
      console.log('db connection closed')
    }, 30000)
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
