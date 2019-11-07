const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/cart/:userId/:productId', async (req, res, next) => {
  try {
    let [cart] = await Cart.findOrCreate({
      where: {
        userId: +req.params.userId
      },
      include: [Product]
    })

    cart = await cart.update({
      sessionId: req.sessionID
    })

    console.log('TCL:  req.params.productId', req.params.productId)
    if (+req.params.productId === 0) {
      console.log('just finding/creating cart, not adding anything')
      res.send(cart).end()
    } else {
      const product = await Product.findByPk(+req.params.productId)
      console.log(Object.keys(Cart.prototype))
      if (await cart.hasProduct(product)) {
        const cpJoin = await CartProduct.findOne({
          where: {
            cartId: cart.id
          }
        })

        const updateCpJoin = await cpJoin.update({quantity: ++cpJoin.quantity})
      } else {
        await cart.addProduct(product)
        await product.addCart(cart)
      }
      const updated = await Cart.findByPk(cart.id, {
        include: [Product]
      })
      res.send(updated)
    }
  } catch (error) {
    next(error)
  }
})
