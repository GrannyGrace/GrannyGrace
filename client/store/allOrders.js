import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_TYPE_OF_ORDER = 'GET_TYPE_OF_ORDER'

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

/**
 * THUNK CREATORS
 */

export const fetchAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    // console.log('TCL: data', data)
    dispatch(getAllOrders(data))
  } catch (err) {
    console.log(err)
  }
}
export const fetchTypeOfOrders = filter => {
  return async dispatch => {
    console.log('here in typeof fetch', filter)
    // dispatch(getTypeOfOrders(filter))
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

    default:
      return state
  }
}
