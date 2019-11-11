const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
module.exports = router

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
      console.log(qty)
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
      console.log('from api carts else', updatedCart.products)
      res.send(updatedCart.products)
    }
  } catch (error) {
    next(error)
  }
})

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
