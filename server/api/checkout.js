const stripeLoader = require('stripe')
const nodemailer = require('nodemailer')
const router = require('express').Router()
module.exports = router

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

const stripe = new stripeLoader(process.env.STRIPE)

const chargeCreator = (tokenId, amount) => {
  return stripe.charges.create({
    amount: +amount * 100,
    currency: 'usd',
    source: tokenId,
    description: 'Statement Description'
  })
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'GrannyGracesApples@gmail.com',
    pass: 'UHR32iXSGYn6ma8'
  }
})

const mapper = (curCart, amount) => {
  let result = '<h1>Order Successful!</h1><h3>Order Summary</h3>'
  curCart.forEach(prod => {
    result += `<ul>
      <li>
      <div>Name: ${prod.name}</div>
      <div>Quantity: $${prod.CartProducts.quantity}</div>
      <div>Price: $${prod.price * prod.CartProducts.quantity}</div>
      </li>
    </ul>`
  })
  result += `<h4>Total: $${amount}</h4>`
  return result
}
const autoMail = async (email, curCart, amount) => {
  const render = mapper(curCart, amount)
  let info = await transporter.sendMail({
    from: '<GranyGracesApples@gmail.com>',
    to: `${email}, GrannyGracesApples@gmail.com`,
    subject: 'Order Confirmation ✔',
    text: 'Order Successful',
    html: `${render}`
  })
  console.log('nodemailer info', info)
}

router.post('/', checkFields, async (req, res, next) => {
  try {
    const charge = await chargeCreator(req.body.token.id, req.body.amount)
    await autoMail(req.body.email, req.body.curCart, req.body.amount)
    res.send('Successful Charge')
  } catch (error) {
    next(error)
  }
})
