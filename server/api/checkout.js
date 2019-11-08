const stripeLoader = require('stripe')
const router = require('express').Router()
module.exports = router
// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
// Using Express
const stripe = new stripeLoader('sk_test_dgylY7JHqVAMdl9kBnVE9Huy0075hFnPpR')
const chargeCreator = (tokenId, amount) => {
  return stripe.charges.create({
    amount: +amount * 100,
    currency: 'usd',
    source: tokenId,
    description: 'Statement Description'
  })
}
router.post('/', async (req, res, next) => {
  console.log(req.body)
  try {
    const charge = await chargeCreator(req.body.token.id, req.body.amount)
    console.log('my charge', charge)
    res.send('Successful Charge')
  } catch (error) {
    next(error)
  }
})
