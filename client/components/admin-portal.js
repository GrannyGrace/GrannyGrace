import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers, deleteUser, updateUser} from '../store/allUsers'
import '../css/adminportal.css'
// import {fetchAllOrders} from '../store/orders'
//need to create fetchAllOrders

const AdminPortal = props => {
  useEffect(() => {
    props.fetchAllUsers()
  }, [])

  return (
    <div className="container needs-top-margin">
      <h3>Admin Portal</h3>
      <p style={{fontWeight: 'bold'}}>Hi {props.user.username}</p>

      <h4>All Active Users: </h4>

      {props.allUsers[0] &&
        props.allUsers.map(user => {
          console.log('each useeeer', user)
          return (
            <div className="active-user-div" key={user.email}>
              <p>Email: {user.email}</p>
              <p>Order: </p>
              <select
                className="change-admin-status"
                value={user.isAdmin}
                onChange={() =>
                  props.updateUser({userId: user.id, isAdmin: !user.isAdmin})
                }
              >
                <option value={true}>Admin</option>
                <option value={false}>User</option>
              </select>
              <button
                className="delete-user-button"
                onClick={() => props.deleteUser(user.id)}
              >
                Delete User
              </button>
            </div>
          )
        })}
    </div>
  )
}

const mapStateToProps = state => {
  return {user: state.user, allUsers: state.allUsers}
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    deleteUser: id => dispatch(deleteUser(id)),
    updateUser: data => dispatch(updateUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
