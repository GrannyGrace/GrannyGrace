const router = require('express').Router()
const {User, UserCart, Product} = require('../db/models')
module.exports = router

router.put('/guest/:productId', async (req, res, next) => {
  try {
    // const product = await Product.findByPk(+req.params.productId)
    if (+req.params.productId === 0) {
      res.send(req.session.cart)
    } else {
      const oldGuestCart = req.session.cart
      const product = await Product.findByPk(+req.params.productId)
      req.session.cart = [...oldGuestCart, product]
      res.send(req.session.cart)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findByPk(+req.params.userId, {include: [Product]})
    if (!user) {
      res.status(401).send('user not found in /carts')
    }
    if (+req.params.productId === 0) {
      // console.log('user printing from cart API', user.products)
      res.json(user.products)
    } else {
      const product = await Product.findByPk(+req.params.productId)
      await product.addUser(user)
      await user.addProduct(product)
      const updatedUser = await User.findByPk(user.id, {include: [Product]})
      // console.log('in carts api', updatedUser.products)
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
