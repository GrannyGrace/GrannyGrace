// const stripe = require('stripe')('pk_test_eHtdgxRH2yBBVyHD5oSxDqkq00BXkKFCFe')
// const router = require('express').Router()

// // Token is created using Checkout or Elements!
// // Get the payment token ID submitted by the form:
// const token = request.body.stripeToken // Using Express

// router.post('/', async (req, res, next) => {
//   try {
//     const charge = await stripe.charges.create({
//       amount: 999,
//       currency: 'usd',
//       description: 'Example charge',
//       source: req.body.stripeToken
//     })
//     res.send('stripe post')
//   } catch (error) {
//     next(error)
//   }
// })
