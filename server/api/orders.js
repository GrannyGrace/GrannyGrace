const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/users/:id', async (req, res, next) => {
  try {
    Order.findAll({where: {userId: req.params.id}})
      .then(orders => res.send(orders))
      .catch(err => res.send(err))
  } catch (error) {
    next(error)
  }
})

module.exports = router
