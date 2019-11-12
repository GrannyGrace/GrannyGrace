import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ALL_USER = 'GET_ALL_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */

export const getAllUsers = allUsers => ({type: GET_ALL_USER, allUsers})

/**
 * THUNK CREATORS
 */

export const fetchAllUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    // console.log('TCL: data', data)
    dispatch(getAllUsers(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_USER:
      return action.allUsers

    default:
      return state
  }
}
