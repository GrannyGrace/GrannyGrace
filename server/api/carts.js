const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
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
    if (req.body.qty) {
      const qty = parseInt(req.body.qty, 10)
      console.log(qty)
    }
    console.log('sessionID from carts api', req.sessionID)

    const [resCart] = await Cart.findOrCreate({
      where: {
        sid: req.sessionID
      },
      include: [Product]
    })

    if (+req.params.productId === 0) {
      res.send(resCart.products)
    } else {
      const product = await Product.findByPk(+req.params.productId)
      await resCart.addProduct(product)
      const updatedCart = await Cart.findByPk(+resCart.id, {include: [Product]})
      console.log('from api carts else, guest', updatedCart.products)
      res.send([updatedCart.products])
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    if (req.body.qty) {
      const qty = parseInt(req.body.qty, 10)
    }

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
    console.log('made it here')
    const cart = await Cart.findOne({
      where: {userId: +req.params.userId}
    })

    await cart.removeProducts()
    const updated = Cart.findByPk(cart.id, {include: [Product]})
    res.json(updated.products)
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
