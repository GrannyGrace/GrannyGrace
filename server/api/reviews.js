const router = require('express').Router()
const {Product, Review, User} = require('../db/models')
module.exports = router

router.post('/:productId/:userId', async (req, res, next) => {
  try {
    if (!req.params.userId) {
      res.status(403).send('no user logged in')
    }
    const newReview = await Review.create(req.body)
    const asocUser = await User.findByPk(+req.params.userId)
    const asocProduct = await Product.findByPk(+req.params.productId)
    await newReview.setProduct(asocProduct)
    await newReview.setUser(asocUser)
    const retProd = await Product.findByPk(+req.params.productId, {
      include: [{model: Review}]
    })
    res.send(retProd)
  } catch (error) {
    next(error)
  }
})
