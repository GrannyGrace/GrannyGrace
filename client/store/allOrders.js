import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_TYPE_OF_ORDER = 'GET_TYPE_OF_ORDER'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */

export const getAllOrders = allOrders => ({type: GET_ALL_ORDERS, allOrders})
export const getTypeOfOrders = partialOrders => ({
  type: GET_TYPE_OF_ORDER,
  partialOrders
})
export const updateOrder = newStatus => ({type: updateOrder, newStatus})

/**
 * THUNK CREATORS
 */

export const fetchAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    data.sort(function(a, b) {
      return a.id - b.id
    })
    dispatch(getAllOrders(data))
  } catch (err) {
    console.log(err)
  }
}
export const fetchTypeOfOrders = filter => {
  return async dispatch => {
    if (filter === 'all') {
      const {data} = await axios.get('/api/orders')
      dispatch(getTypeOfOrders(data))
    } else {
      const {data} = await axios.get('/api/orders')
      const filteredOrders = data.filter(order => order.status === filter)
      dispatch(getTypeOfOrders(filteredOrders))
    }
  }
}
export const fetchUpdateOrder = info => async dispatch => {
  try {
    await axios.put(`/api/orders/${info.orderId}`, info)
    dispatch(updateOrder(info.orderId))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.allOrders
    case GET_TYPE_OF_ORDER:
      return action.partialOrders
    case UPDATE_ORDER_STATUS:
      return action.newStatus

    default:
      return state
  }
}
