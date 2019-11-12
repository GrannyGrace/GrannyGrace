import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const OrderSummary = props => {
  console.log('prop orders', props.orders)
  return (
    <div className="card">
      <h1>Order Summary</h1>
      <ul className="list-group list-group-flush">
        {props.orders.lockedProducts.map(prod => {
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
                <small className="card-text">Price: ${prod.price}</small>
              </Link>
            </div>
          )
        })}
      </ul>
      <h4 className="list-group-item mb-1 card-title">
        total: ${props.order.price}
      </h4>
    </div>
  )
}

export default connect(({orders}) => ({orders}))(OrderSummary)
