const router = require('express').Router()
const {User, Review, Order} = require('../db/models')
module.exports = router

/* LOGGED IN USER


Finn's comments,
to implement cart stuff
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
    // console.log(req.session)
    req.session.cartItems = []
  } else {
    req.session.cartItems.push({
      productId: Math.floor(Math.random() * 100),
      quantity: Math.floor(Math.random() * 10)
    })
  }
  // console.log('req.session', req.session)
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
      attributes: ['id', 'email', 'isAdmin'],
      include: [{model: Order}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//Need currentPassword and newPassword from req.body
//Since this is a put request, if user is found and password is correct,
//We update the user. Otherwise, we send back an error message
//We pass in the correctPassword instance method from server/db/models/user.js
//IndividualHooks: true is necessary so that the beforeBulkUpdate hook(inside model file) can get triggered

router.put('/reset-password/:id', (req, res) => {
  const {currentPassword, newPassword} = req.body
  User.findOne({where: {id: req.params.id}})
    .then(user => {
      if (user && user.correctPassword(currentPassword)) {
        User.update(
          {password: newPassword},
          {where: {id: req.params.id}, returning: true, individualHooks: true}
        )
          .then(updatedUser => res.send(updatedUser[1][0]))
          .catch(err => {
            res.status(500).send(err)
          })
      } else {
        res.status(500).send('Invalid Email/Password')
      }
    })
    .catch(err => res.status(500).send(err))
})

router.put('/:id', (req, res) => {
  User.update(req.body, {where: {id: req.params.id}, returning: true})
    .then(user => {
      res.send(user[1][0])
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.delete('/:id', (req, res) => {
  User.destroy({where: {id: req.params.id}})
    .then(() => res.send({success: 'user deleted'}))
    .catch(err => res.status(500).send(err))
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     if (+req.user.id === +req.params.id) {
//       console.log('Correct user is viewing his/her own account info')
//     }

//     const users = await User.findByPk(+req.user.id, {
//       include: [{model: Review}, {model: Order}]
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
//02236845644ea9b0a2ac63a0029ecb2fc20327256786f68a4849d4f5942def50
