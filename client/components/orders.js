import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store/orders'

class Orders extends React.Component {
  componentDidMount() {
    console.log('props id****', this.props.currentUser)
    this.props.fetchOrders(this.props.currentUser.id)
  }

  render() {
    const {orders} = this.props
    return (
      <div className="container">
        <h1>My Orders</h1>
        <ul>
          {orders.map((order, i) => (
            <li key={i}>
              {order.id} - {order.status} - {order.price}{' '}
            </li>
          ))}
        </ul>
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
