const router = require('express').Router()
const {Order} = require('../db/models')
const {Product} = require('../db/models')

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

module.exports = router
