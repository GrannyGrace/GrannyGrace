import React from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {fetchUpdateCart, setCart} from '../store/curCart'
// import CardSection from './card-section'
// import AddressSection from './address-section'
import 'bootstrap/dist/css/bootstrap.min.css'
const calcTotal = cart => {
  return cart.reduce((accum, cur) => accum + cur.price, 0)
}
class InjectedForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      amount: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const price = calcTotal(this.props.curCart)
    this.setState({amount: price})
  }
  componentDidUpdate(prevProps) {
    console.log('TCL: prevProps', prevProps)
    if (prevProps.curCart !== this.props.curCart) {
      const price = calcTotal(this.props.curCart)
      this.setState({amount: price})
    }
  }
  async handleSubmit(ev) {
    ev.preventDefault()
    //const user = this.props.user
    let {token} = await this.props.stripe.createToken({
      name: this.state.name
    })
    let amount = this.state.amount
    axios.post('/api/checkout', {token, amount})
    console.log(token)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    return (
      <div>
        add to the conditional below to include guestUser
        {this.props.user.id && (
          <div className="container">
            <form
              className="form-group p-3 shadow-1g border border-primary mt-3"
              onSubmit={this.handleSubmit}
            >
              <label>Name On Card</label>
              <input
                className="input-group border border-dark my-1 p-1"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="Joe Shmo"
              />
              <div>Amount: ${this.state.amount}</div>
              {/* <input
            className="input-group border border-dark my-1 p-1"
            name="amount"
            type="text"
            onChange={this.handleChange}
            value={this.state.amount}
            placeholder="1000.00"
          /> */}

              <label>Card/Exp/CV</label>
              <CardElement
                name="card"
                className="card-element p-2 border border-dark"
              />

              <button
                className="btn btn-primary border border-dark shadow mt-3"
                type="submit"
              >
                Confirm order
              </button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

export default injectStripe(
  connect(({curCart, user}) => ({curCart, user}), {fetchUpdateCart, setCart})(
    InjectedForm
  )
)

// // Within the context of `Elements`, this call to createPaymentMethod knows from which Element to
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
