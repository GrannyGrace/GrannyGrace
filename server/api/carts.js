const router = require('express').Router()
const {User, UserCart, Product} = require('../db/models')
module.exports = router

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId, {include: [Product]})
    console.log('TCL: user', user)
    if (!user) {
      res.status(401).send('user not found in /carts')
    }
    if (+req.params.productId === 0) {
      res.json(user.products)
    } else {
      const product = await Product.findByPk(+req.params.productId)
      await product.addUser(user)
      await user.addProduct(product)
      const updatedUser = await User.findByPk(user.id, {include: [Product]})
      res.json(updatedUser.products)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.userId)
    const products = await Product.findAll({
      include: [
        {
          model: User,
          where: {
            id: user.id
          }
        }
      ]
    })
    products.forEach(async prod => {
      await prod.removeUser(user)
    })
    await user.removeProducts(user.products)
    const updated = User.findByPk(user.id, {include: [Product]})
    console.log('user in clear cart route', updated)
    res.json(updated.products)
  } catch (error) {
    next(error)
  }
})
