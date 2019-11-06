const router = require('express').Router()
const {User, Cart, Product} = require('../db/models')
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
    const [cart] = await Cart.findOrCreate({
      where: {
        userId: +req.params.userId
      },
      include: [Product]
    })

    await cart.update({
      sessionId: req.sessionId
    })
    if (req.params.productId === 'create') {
      console.log('just finding/creating cart, not adding anything')
      res.send(cart)
    }
    const product = await Product.findByPk(+req.params.productId)
    await cart.addProduct(product)
    res.send(cart)
  } catch (error) {
    next(error)
  }
})
