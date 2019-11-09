import axios from 'axios'

//action define
const SET_CART = 'SET_CART'

//action create
export const setCart = cart => {
  return {type: SET_CART, cart}
}

//thunks
export const fetchUpdateCart = (userId, productId = 0) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/carts/${userId}/${productId}`)
      console.log('TCL: cart data', data)
      if (!data) {
        // console.log('cart data not found/created')
      }
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
      // console.log('messed up in fetchUpdateCart thunk')
    }
  }
}

export const clearCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/carts/${id}`)
      console.log('TCL: data in clearCart', data)
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
      console.log('messed up in clearCart thunk')
    }
  }
}

//reducer

export default function(curCart = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart

    default:
      return curCart
  }
}
