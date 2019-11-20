const router = require('express').Router()
const {Product, Review} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const gis = require('g-i-s')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      order: [['id', 'ASC']]
    })

    // Product.update(
    //   {imageUrl: }
    // )

    const logResults = async (error, results) => {
      if (error) {
        console.log(error)
      } else {
        console.log('One url', results[0].url)
        await product.update({imageUrl: results[0].url})
        res.json(allProducts)
      }
    }
    gis(product.name, logResults)

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

    const logResults = async (error, results) => {
      if (error) {
        console.log(error)
      } else {
        // console.log(JSON.stringify(results, null, '  '))
        console.log('One url', results[0].url)
        await product.update({imageUrl: results[0].url})
        res.json(product)
      }
    }
    gis(product.name, logResults)

    // res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  // console.log('TCL: req.body.category', req.body.category)
  try {
    if (!req.user || !req.user.isAdmin) {
      res.send('User is not an admin').end()
      return null
    }

    const product = await Product.findByPk(+req.params.id)
    if (!product) {
      res.status(401).send('product not found')
    }
    console.log('TCL: product in db', product.category)
    // const updated = await product.update(req.body)
    const updated = await product.update({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      availability: req.body.availability,
      quantity: req.body.quantity,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    })
    res.send(updated)
  } catch (error) {
    next(error)
  }
})

router.put('/invUp/:prodId/:qty', async (req, res, next) => {
  try {
    const invProd = await Product.findByPk(+req.params.prodId)
    await Product.update(
      {
        quantity: invProd.quantity - +req.params.qty
      },
      {
        where: {
          id: +req.params.prodId
        }
      }
    )
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.get('/search/:term', async (req, res, next) => {
  try {
    // console.log('req.params.term', req.params.term)
    const searchProducts = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.params.term}%`
        }
      }
    })

    res.send(searchProducts)
  } catch (err) {
    next(err)
  }
})
