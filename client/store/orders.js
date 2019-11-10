import axios from 'axios'

//Define Action
export const SET_ALL_ORDERS = 'SET_ALL_ORDERS'
const setOrders = orders => ({
  type: SET_ALL_ORDERS,
  orders
})

export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/users/${userId}`)
      console.log('data****', data)
      dispatch(setOrders(data))
    } catch (err) {
      console.log('error fetching orders', err)
    }
  }
}

export const OrdersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}
