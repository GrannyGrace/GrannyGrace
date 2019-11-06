import axios from 'axios'

const SET_CART = 'SET_CART'

const setCart = cart => {
  return {type: SET_CART, cart}
}

export const fetchUpdateCart = (userId, productId = 'create') => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/cart/${userId}/${productId}`)
      console.log('TCL: cart data', data)
      if (!data) {
        console.log('cart data not found/created')
      }
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
      console.log('messed up in fetchUpdateCart thunk')
    }
  }
}

export default function(curCart = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart

    default:
      return curCart
  }
}
