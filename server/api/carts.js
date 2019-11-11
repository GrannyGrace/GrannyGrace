const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
module.exports = router

router.put('/guest/:productId', async (req, res, next) => {
  try {
    // const product = await Product.findByPk(+req.params.productId)
    if (+req.params.productId === 0) {
      res.send(req.session.cart)
    } else {
      const oldGuestCart = req.session.cart
      const product = await Product.findByPk(+req.params.productId)
      req.session.cart = [...oldGuestCart, product]
      res.send(req.session.cart)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    if (req.body.qty) {
      const qty = parseInt(req.body.qty, 10)
      console.log(qty)
    }

    // const user = await User.findByPk(+req.params.userId, {include: [Cart]})
    // console.log(user)
    // const newCart = await Cart.create({userId: +req.params.userId})

    const [resCart] = await Cart.findOrCreate({
      where: {
        userId: +req.params.userId
      },
      include: [Product]
    })
    console.log('from api carts', resCart.products)
    if (+req.params.productId === 0) {
      res.send(resCart.products)
    } else {
      const product = await Product.findByPk(+req.params.productId)
      await resCart.addProduct(product)
      const updatedCart = await Cart.findByPk(+resCart.id, {include: [Product]})
      console.log('from api carts else', updatedCart.products)
      res.send(updatedCart.products)
    }
  } catch (error) {
    next(error)
  }
})

// const cart = await Cart.findOrCreate({
//   where: {
//     userId: +req.params.userId,
//   }
// })
//     console.log(JSON.parse(JSON.stringify(user)))
//     if (!user) {
//       res.status(401).send('user not found in /carts')
//     }

//     else {
//       const product = await Product.findByPk(+req.params.productId)
//       await product.addUser(user)
//       await user.addProduct(product)

//       const usercart = await UserCart.findAll({
//         where: {
//           userId: +req.params.userId,
//           productId: +req.params.productId
//         }
//       })
//       const userCartQuantity = JSON.parse(JSON.stringify(usercart))

//       const updatedUser = await User.findByPk(user.id, {include: })
//       res.json(updatedUser.products)
//     }
// })

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId)
    const products = await Product.findAll({
      include: [
        {
          model: User,
          where: {
            id: user.id
          }
        }
      ]
    })
    products.forEach(async prod => {
      await prod.removeUser(user)
    })
    await user.removeProducts(user.products)
    const updated = User.findByPk(user.id, {include: [Product]})
    console.log('user in clear cart route', updated)
    res.json(updated.products)
  } catch (error) {
    next(error)
  }
})
