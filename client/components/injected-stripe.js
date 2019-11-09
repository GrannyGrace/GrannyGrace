// import React from 'react'
// import {connect} from 'react-redux'
// import {Elements, injectStripe} from 'react-stripe-elements'
// import CardSection from './card-section'
// import AddressSection from './address-section'

// class MyStoreCheckout extends React.Component {
//   handleSubmit = ev => {
//     const user = this.props.user
//     ev.preventDefault()

//     // Within the context of `Elements`, this call to createPaymentMethod knows from which Element to
//     // create the PaymentMethod, since there's only one in this group.
//     // See our createPaymentMethod documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
//     this.props.stripe
//       .createPaymentMethod('card', {billing_details: {name: user.name}})
//       .then(({paymentMethod}) => {
//         console.log('Received Stripe PaymentMethod:', paymentMethod)
//       })

//     // You can also use handleCardPayment with the PaymentIntents API automatic confirmation flow.
//     // See our handleCardPayment documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-payment
//     this.props.stripe.handleCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', data)

//     // You can also use handleCardSetup with the SetupIntents API.
//     // See our handleCardSetup documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-handle-card-setup
//     this.props.stripe.handleCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', data)

//     // You can also use createToken to create tokens.
//     // See our tokens documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-create-token
//     this.props.stripe.createToken({type: 'card', name: user.name})
//     // token type can optionally be inferred if there is only one Element
//     // with which to create tokens
//     // this.props.stripe.createToken({name: 'Jenny Rosen'});

//     // You can also use createSource to create Sources.
//     // See our Sources documentation for more:
//     // https://stripe.com/docs/stripe-js/reference#stripe-create-source
//     this.props.stripe.createSource({
//       type: 'card',
//       owner: {
//         name: user.name
//       }
//     })
//   }
//   render() {
//     return (
//       <Elements>
//         <form onSubmit={this.handleSubmit}>
//           <AddressSection />
//           <CardSection />
//           <button type='submit'>Confirm order</button>
//         </form>
//       </Elements>
//     )
//   }
// }

// export default injectStripe(connect(({user}) => ({user}))(MyStoreCheckout))
