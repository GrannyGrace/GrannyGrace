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
router.post('/', async (req, res, next) => {
  console.log('checkout api')
  try {
    if (!req.body.token.name) {
      res.send('Checkout not successful, include name')
      return
    }
    if (!+req.body.amount) {
      res.send('Checkout not successful, your cart has no apples')
      return
    }
    const charge = await chargeCreator(req.body.token.id, req.body.amount)
    console.log('my charge', charge)
    res.send('Successful Charge')
  } catch (error) {
    res.send('Checkout not succesful')
    next(error)
  }
})
