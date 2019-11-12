const stripeLoader = require('stripe')
const router = require('express').Router()
module.exports = router
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
// Using Express
const stripe = new stripeLoader(process.env.STRIPE)
const chargeCreator = (tokenId, amount) => {
  return stripe.charges.create({
    amount: +amount * 100,
    currency: 'usd',
    source: tokenId,
    description: 'Statement Description'
  })
}

const checkFields = (req, res, next) => {
  const error = new Error('Checkout not successful, include shipping address')
  error.status = 401
  if (!req.body.address) {
    next(error)
  } else if (!req.body.token.card.name) {
    error.message = 'Checkout not successful, include name'
    next(error)
  } else if (!req.user && !req.body.email) {
    error.message = 'Checkout not successful, include email'
    next(error)
  } else if (!+req.body.amount) {
    error.message = 'Checkout not successful, your cart has no apples'
    next(error)
  } else {
    next()
  }
}

router.post('/', checkFields, async (req, res, next) => {
  try {
    const charge = await chargeCreator(req.body.token.id, req.body.amount)
    console.log('my charge', charge)
    res.send('Successful Charge')
  } catch (error) {
    next(error)
  }
})
