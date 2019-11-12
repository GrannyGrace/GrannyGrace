import React from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {fetchUpdateCart, setCart, clearCart} from '../store/curCart'
import {addOrder} from '../store/orders'
// import CardSection from './card-section'
// import AddressSection from './address-section'
import 'bootstrap/dist/css/bootstrap.min.css'
const calcTotal = cart => {
  console.log(cart)
  return cart.reduce((accum, cur) => {
    return accum + cur.price * cur.CartProducts.quantity
  }, 0)
}
class InjectedForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      amount: 0,
      address: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const price = calcTotal(this.props.curCart)
    this.setState({amount: price})
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.curCart !== this.props.curCart &&
      Array.isArray(this.props.curCart)
    ) {
      const price = calcTotal(this.props.curCart)
      this.setState({amount: price})
    }
    console.log('state message', this.state.message)
  }
  async handleSubmit(ev) {
    ev.preventDefault()
    //const user = this.props.user
    let {token} = await this.props.stripe.createToken({
      name: this.state.name
    })
    let {amount, address} = this.state
    try {
      const {data} = await axios.post('/api/checkout', {token, amount, address})
      this.setState({message: data})
      await this.props.addOrder(this.props.user.id, amount)
      await this.props.clearCart(this.props.user.id)
      this.props.history.push('/order-summary/current')
    } catch (error) {
      this.setState({message: error.response.data})
    }

    // if (!this.state.message || !this.state.message.includes('not')) {

    //   console.log(token)

    // }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    console.log('props in injected', this.props)
    return (
      <div>
        (
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
            <label>Shipping Address</label>
            <input
              className="input-group border border-dark my-1 p-1"
              name="address"
              type="text"
              onChange={this.handleChange}
              value={this.state.address}
              placeholder="123 Someplace Ave."
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

            <label style={{display: 'block'}}>Card/Exp/CV</label>
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
            {this.state.message && this.state.message.includes('not') ? (
              <span style={{color: 'red'}}>{this.state.message}</span>
            ) : (
              <span style={{color: 'green'}}>{this.state.message}</span>
            )}
          </form>
        </div>
        )}
      </div>
    )
  }
}

export default withRouter(
  injectStripe(
    connect(({curCart, user, order}) => ({curCart, user, order}), {
      fetchUpdateCart,
      setCart,
      clearCart,
      addOrder
    })(InjectedForm)
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
