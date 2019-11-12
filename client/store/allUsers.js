import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ALL_USER = 'GET_ALL_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */

export const getAllUsers = allUsers => ({type: GET_ALL_USER, allUsers})
const deleteUserSuccess = userId => ({type: DELETE_USER, userId})
const updateUserSuccess = updatedUserData => ({
  type: UPDATE_USER,
  user: updatedUserData
})

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

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(deleteUserSuccess(userId))
  } catch (err) {
    console.error('err deleting user', err)
  }
}

export const updateUser = ({userId, ...data}) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, data)
    dispatch(updateUserSuccess(res.data))
  } catch (err) {
    console.error('err deleting user', err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_USER:
      return action.allUsers
    case DELETE_USER:
      return state.filter(user => user.id !== parseInt(action.userId, 10))
    case UPDATE_USER: {
      const clonedUsers = [...state]
      const userIndex = clonedUsers.findIndex(
        user => user.id === action.user.id
      )
      clonedUsers.splice(userIndex, 1, action.user)
      return clonedUsers
    }
    default:
      return state
  }
}
