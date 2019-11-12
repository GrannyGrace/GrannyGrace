const stripeLoader = require('stripe')
const React = require('react')
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
//let testAccount
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'GrannyGracesApples@gmail.com',
    pass: 'UHR32iXSGYn6ma8'
  }
})
// const Comp = curCart => {
//   return (
//     <div>
//       {curCart.map(prod => {
//         <div key={prod.id}>
//           <div>{prod.name}</div>
//         </div>
//       })}
//     </div>
//   )
// }

const mapper = (curCart, amount) => {
  let result = '<h1>Order Successful!</h1><h3>Order Summary</h3>'
  curCart.forEach(prod => {
    result += `<ul>
      <li>
      <div>Name: ${prod.name}</div>
      <div>Price: $${prod.price}</div>
      </li>
    </ul>`
  })
  result += `<h4>Total: $${amount}</h4>`
  return result
}
const autoMail = async (email, curCart, amount) => {
  // if (!testAccount) {
  //   //testAccount = await nodemailer.createTestAccount()
  //   transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: testAccount.user,
  //       pass: testAccount.pass
  //     }
  //   })
  // }
  const render = mapper(curCart, amount)
  let info = await transporter.sendMail({
    from: '<GranyGracesApples@gmail.com>',
    to: `${email}, GrannyGracesApples@gmail.com`, // list of receivers
    subject: 'Order Confirmation ✔', // Subject line
    text: 'Order Successful', // plain text body
    html: `${render}` // html body
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
