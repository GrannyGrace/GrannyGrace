const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(+req.params.id)
    if (!product) {
      res.status(401).send('product not found')
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(+req.params.id)
    console.log('TCL: product', product)
    if (!product) {
      res.status(401).send('product not found')
    }
    const updated = await product.update(req.body)
    res.send(updated)
  } catch (error) {
    next(error)
  }
})
