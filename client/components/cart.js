import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {setCart, fetchUpdateCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import {withRouter} from 'react-router-dom'

const Cart = props => {
  useEffect(
    () => {
      console.log(props.user.email)
      if (props.user.id) {
        props.fetchUpdateCart(props.user.id)
      } else {
        //change below to use a thunk that gets guest cart data from Session.data
        props.setCart([])
      }
    },
    [props.user.id]
  )
  let totalPrice = 0
  if (!props.curCart || !props.curCart[0]) {
    return <span>cart is empty</span>
  }
  return (
    <div>
      {props.curCart.map(prod => {
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

export default withRouter(
  connect(({curCart, user}) => ({curCart, user}), {
    fetchUpdateCart,
    setCart,
    sessionChecker,
    auth
  })(Cart)
)
