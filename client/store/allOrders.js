import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */

export const getAllOrders = allOrders => ({type: GET_ALL_ORDERS, allOrders})

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

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.allOrders

    default:
      return state
  }
}
