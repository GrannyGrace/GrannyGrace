import axios from 'axios'

//action define
const SET_CART = 'SET_CART'

//action create
export const setCart = cart => {
  return {type: SET_CART, cart}
}

//thunks
export const fetchUpdateCart = (userId, productId = 0, qty) => {
  return async dispatch => {
    try {
      console.log('from store', qty)
      const {data} = await axios.put(`/api/carts/${userId}/${productId}`, qty)
      if (!data) {
        console.log('cart data not found/created')
      }
      console.log('from curCart', data)
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
      console.log('messed up in fetchUpdateCart thunk')
    }
  }
}

export const fetchGuestCart = (productId = 0, qty) => {
  console.log('fetchGuestCart run', qty)
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/carts/guest/${productId}`, qty)
      if (!data) {
        console.log('fetchGuestCart returned no data')
      }
      if (data) {
        console.log('from curCart fetchGuestCart', data)
        dispatch(setCart(data))
      }
    } catch (error) {
      console.log('error in fetchGuestCart', error)
    }
  }
}

export const clearCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/carts/${id}`)
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
      console.log('messed up in clearCart thunk')
    }
  }
}
export const removeFromCart = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/carts/${userId}/${productId}`)
      console.log('data in clearCart', data)
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
      console.log('messed up in removeFromCart thunk')
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
