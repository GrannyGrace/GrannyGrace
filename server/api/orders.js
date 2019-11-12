const router = require('express').Router()
const {Product, Cart, User, Order} = require('../db/models')

router.get('/users/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      },
      include: [{model: Product}]
    })
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: +req.params.userId}
    })
    console.log(Order.prototype)
    const user = await cart.getUser()
    const products = await cart.getProducts()
    const order = await Order.create({
      price: req.body.total,
      lockedProducts: products
    })
    order.setUser(user)
    const updated = await Order.findByPk(order.id, {include: [User]})
    console.log('lockedproducts', order.lockedProducts)
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
