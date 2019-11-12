import axios from 'axios'

//Define Action
export const SET_ALL_ORDERS = 'SET_ALL_ORDERS'
export const ADD_TO_ORDER = 'ADD_TO_ORDER'

//action creators
export const setOrders = orders => ({
  type: SET_ALL_ORDERS,
  orders
})

export const addToOrder = newOrder => {
  return {
    type: ADD_TO_ORDER,
    newOrder
  }
}

//thunks
export const fetchOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/users/${userId}`)
      dispatch(setOrders(data))
    } catch (err) {
      console.log('error fetching orders', err)
    }
  }
}

export const addOrder = (userId, total) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/orders/${userId}`, {total})
      dispatch(addToOrder(data))
    } catch (error) {
      console.error('messed up in addOrder thunk')
    }
  }
}

//reducer
export const OrdersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_ORDERS:
      return action.orders
    case ADD_TO_ORDER:
      return [...state, action.newOrder]
    default:
      return state
  }
}
