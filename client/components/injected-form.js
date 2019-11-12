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
      email: '',
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
    let {amount, address, email} = this.state
    let {user, addOrder, clearCart, curCart, stripe, history} = this.props
    if (user && user.id) {
      email = user.email
    }
    //const user = this.props.user
    let {token} = await stripe.createToken({
      name: this.state.name
    })
    try {
      const {data} = await axios.post('/api/checkout', {
        token,
        amount,
        address,
        email,
        curCart
      })
      this.setState({message: data})
      await addOrder(amount, email)
      await clearCart()
      history.push('/order-summary/current')
    } catch (error) {
      this.setState({message: error.response.data})
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    return (
      <div>
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
            {(!this.props.user || !this.props.user.id) && (
              <React.Fragment>
                <label>Email</label>
                <input
                  className="input-group border border-dark my-1 p-1"
                  name="email"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.email}
                  placeholder="joe@shmo.com"
                />
              </React.Fragment>
            )}
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
