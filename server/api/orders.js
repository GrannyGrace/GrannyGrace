const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/users/:id', (req, res) => {
  Order.findAll({where: {userId: req.params.id}})
    .then(orders => res.send(orders))
    .catch(err => res.send(err))
})

module.exports = router
