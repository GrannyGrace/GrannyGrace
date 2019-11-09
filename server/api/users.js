const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

/* LOGGED IN USER

ADD TO CART:
1. Add a row (with quantity) to UserCart table

CHECKOUT:
2. Add a row to Order table
   const order = await Order.create(...)

   const cartItems = await user.getCartItems()

2a. Confirm valid quantity and inventory

3. Add a row to OrderProduct table
   const orderProducts = await order.addProducts(cartItems)

4. Set price at time of purchase
   await Promise.all(orderProducts.map(op => op.assignPrice()))

5. Delete all the user's cartitems

*/

router.use((req, res, next) => {
  if (!req.session.cartItems) {
    console.log(req.session)
    req.session.cartItems = []
  } else {
    req.session.cartItems.push({
      productId: Math.floor(Math.random() * 100),
      quantity: Math.floor(Math.random() * 10)
    })
  }
  console.log('req.session', req.session)
  if (req.user) {
    console.log('req.user.isAdmin', req.user.isAdmin)
  } else {
    console.log('not logged in')
  }
  next()
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
