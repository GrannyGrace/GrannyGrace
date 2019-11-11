const router = require('express').Router()
const {User, Cart, Product, Order} = require('../db/models')
module.exports = router

const userCheck = (req, res, next) => {
  if (!req.user || req.user.id !== +req.params.userId) {
    res.json('must be logged in to correct user to edit cart')
  } else {
    next()
  }
}

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

    if (+req.params.productId === 0) {
      res.send(resCart.products)
    } else {
      const product = await Product.findByPk(+req.params.productId)
      await resCart.addProduct(product)
      const updatedCart = await Cart.findByPk(+resCart.id, {include: [Product]})

      res.send(updatedCart.products)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', userCheck, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: +req.params.userId}
    })
    const products = await cart.getProducts()
    await cart.removeProducts()
    products.forEach(async prod => {
      await prod.removeCart(cart)
    })
    const updated = Cart.findByPk(cart.id, {include: [Product]})
    res.json([])
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/:productId', userCheck, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: +req.params.userId
      }
    })
    const product = await Product.findByPk(+req.params.productId)
    await cart.removeProduct(product)
    const updated = await Cart.findByPk(cart.id, {include: [Product]})
    res.json(updated.products)
  } catch (error) {
    next(error)
  }
})
