const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')
module.exports = router

const userCheck = (req, res, next) => {
  if (!req.user || req.user.id !== +req.params.userId) {
    res.json('must be logged in to correct user to edit cart')
  } else {
    next()
  }
}

router.put('/guest/:productId', async (req, res, next) => {
  try {
    const [resCart] = await Cart.findOrCreate({
      where: {
        sid: req.sessionID
      },
      include: [Product]
    })

    if (+req.params.productId === 0) {
      res.send(resCart.products)
    } else {
      const product = await Product.findByPk(+req.params.productId)
      await resCart.addProduct(product)
      const updatedCart = await Cart.findByPk(+resCart.id, {include: [Product]})
      console.log('from api carts else, guest', updatedCart.products)
      res.send([updatedCart.products])
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const [resCart] = await Cart.findOrCreate({
      where: {
        userId: +req.params.userId
      },
      include: [Product]
    })

    if (+req.params.productId === 0) {
      res.send(resCart.products)
    } else {
      const qty = +req.body.qty
      const foundProduct = resCart.products
        .map(prod => {
          return {id: prod.id, name: prod.name}
        })
        .find(elem => {
          return elem.id === +req.params.productId
        })

      if (!foundProduct) {
        const product = await Product.findByPk(+req.params.productId)
        await resCart.addProduct(product)
        await CartProduct.update(
          {quantity: qty},
          {
            where: {
              productId: +req.params.productId,
              cartId: +resCart.id
            },
            returning: true
          }
        )
        const updatedCart = await Cart.findByPk(+resCart.id, {
          include: [Product]
        })
        res.send(updatedCart.products)
      }

      if (foundProduct) {
        const [cartQuantity] = await CartProduct.findAll({
          where: {
            productId: +req.params.productId,
            cartId: +resCart.id
          },
          attributes: ['quantity']
        })

        console.log(cartQuantity.quantity)
        const newQty = cartQuantity.quantity + qty
        console.log('new qty', newQty)

        await CartProduct.update(
          {quantity: newQty},
          {
            where: {
              productId: +req.params.productId,
              cartId: +resCart.id
            },
            returning: true
          }
        )
        res.send(resCart.products)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', userCheck, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: +req.params.userId}
    })
    const products = await cart.getProducts()
    await cart.removeProducts()
    products.forEach(async prod => {
      await prod.removeCart(cart)
    })
    const updated = Cart.findByPk(cart.id, {include: [Product]})
    res.json([])
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/:productId', userCheck, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: +req.params.userId
      }
    })
    const product = await Product.findByPk(+req.params.productId)
    await cart.removeProduct(product)
    const updated = await Cart.findByPk(cart.id, {include: [Product]})
    res.json(updated.products)
  } catch (error) {
    next(error)
  }
})
