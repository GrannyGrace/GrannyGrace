import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {
  setCart,
  fetchUpdateCart,
  fetchGuestCart,
  removeFromCart
} from '../store/curCart'

import {withRouter, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/cart.css'

const Cart = props => {
  useEffect(
    () => {
      if (props.user.id) {
        props.fetchUpdateCart(props.user.id)
      } else {
        props.fetchGuestCart(0)
      }
    },
    [props.user.id]
  )
  let totalPrice = 0
  if (!props.curCart || !props.curCart[0]) {
    return (
      <React.Fragment>
        <Card.Body>cart is empty</Card.Body>
      </React.Fragment>
    )
  }

  const deleteFromCart = productId => {
    if (props.user.id) {
      props.removeFromCart(props.user.id, productId)
    } else {
      props.removeFromCart('guest', productId)
    }
  }

  return (
    <React.Fragment>
      <div className="card">
        <div className="list-group list-group-flush">
          {props.curCart.map(prod => {
            totalPrice += prod.price * prod.CartProducts.quantity
            return (
              <div
                className="list-group-item list-group-item-action flex-column align-items-start"
                key={prod.id}
              >
                <Link to={`/products/${prod.id}`} id="cart-item" href="#!">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1 card-title">{prod.name}</h5>
                    <small />
                  </div>
                  <p className="mb-1 card-text">{prod.description}</p>
                  <small className="card-text">
                    Unit Price: ${prod.price} Qty: {prod.CartProducts.quantity}{' '}
                    Item Total: ${+prod.price * prod.CartProducts.quantity}
                  </small>
                </Link>
                <button
                  style={{display: 'inline'}}
                  onClick={() => {
                    deleteFromCart(prod.id)
                  }}
                  type="button"
                  className="btn btn-success"
                >
                  remove
                </button>
              </div>
              // <li className='list-group-item list-group-item-primary list-group-item-action flex-column align-items-start active' key={prod.id}>
              //   <div className='d-flex w-100 justify-content-between'>{prod.name}</div>
              //   <h5 className = 'mb-1'>Price: {prod.price}</h5>
              // </li>
            )
          })}
          <h4 key="subtotal" className="list-group-item mb-1 card-title">
            Subtotal: ${totalPrice}
          </h4>
        </div>
      </div>
      <Link to="/checkout">
        <button type="button" className="btn btn-lg btn-primary">
          Checkout
        </button>
      </Link>
    </React.Fragment>
  )
}

export default withRouter(
  connect(({curCart, user}) => ({curCart, user}), {
    fetchUpdateCart,
    fetchGuestCart,
    setCart,
    removeFromCart
  })(Cart)
)
