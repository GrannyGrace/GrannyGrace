const router = require('express').Router()
const {Product, Review} = require('../db/models')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      order: [['id', 'ASC']]
    })
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(+req.params.id, {
      include: [{model: Review}]
    })
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

router.get('/search/:term', async (req, res, next) => {
  try {
    console.log('req.params.term', req.params.term)
    const searchProducts = await Product.findAll({
      where: {[Op.like]: `%${req.params.term}%`}
    })
    res.end()
  } catch (err) {
    next(err)
  }
})
