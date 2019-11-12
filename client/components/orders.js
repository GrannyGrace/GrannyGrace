import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'
import OrderSummary from './order-summary'
import {Link} from 'react-router-dom'

class Orders extends React.Component {
  componentDidMount() {
    console.log('props id****', this.props.currentUser)
    this.props.fetchOrders(this.props.currentUser.id)
  }

  render() {
    const {orders} = this.props
    return (
      <div className="card">
        <h1>Order Summary</h1>
        <ul className="list-group list-group-flush">
          {orders.map((ord, ind) => {
            return (
              <div
                className="list-group-item list-group-item-action flex-column align-items-start"
                key={ord.id}
              >
                <Link to={`/order-summary/${ind}`} id="cart-item" href="#!">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1 card-title">Status: {ord.status}</h5>
                    <small />
                  </div>
                  <p className="mb-1 card-text">
                    Created on: {ord.createdAt.split('T')[0]}
                  </p>
                  <small className="card-text">Price: ${ord.price}</small>
                </Link>
              </div>
            )
          })}
        </ul>
        <h4 className="list-group-item mb-1 card-title" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    currentUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: id => dispatch(fetchOrders(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)

// Backend

// Grabbed two orphan orders already in DB, assigned them a userId so that they're now owned
// Created a route to get a list of orders for a user

// Frontend

// Created an action, reducer for orders
// Created a component for orders and called fetchOrders - it's componentDidMount fetches the list of orders
// Then rendered that in the component
