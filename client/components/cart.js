import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchUpdateCart} from '../store/curCart'

const Cart = props => {
  //   useEffect(() => {
  //     props.fetchUpdateCart(props.user.id)
  //   }, [])

  console.log('TCL: props.curCart', props.curCart)
  let totalPrice = 0
  if (!props.curCart.products.length) {
    return <span>cart is empty</span>
  }
  return (
    <div>
      {props.curCart.products.map(prod => {
        totalPrice += prod.price
        return (
          <div key={prod.id}>
            <div>{prod.name}</div>
            <div>{prod.price}</div>
          </div>
        )
      })}
      <div>Total Price: {totalPrice}</div>
    </div>
  )
}

export default connect(({curCart, user}) => ({curCart, user}), {
  fetchUpdateCart
})(Cart)
