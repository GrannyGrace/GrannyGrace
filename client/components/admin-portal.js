import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/allUsers'
// import {fetchAllOrders} from '../store/orders'
//need to create fetchAllOrders

const AdminPortal = props => {
  useEffect(() => {
    props.fetchAllUsers()
  }, [])

  return (
    <div>
      <h4>Admin Portal</h4>
      <p style={{fontWeight: 'bold'}}>Hi {props.user.username}</p>

      <h4>See All Active Orders: </h4>
      <h4>See All Users: </h4>

      {props.allUsers[0] &&
        props.allUsers.map(user => {
          return (
            <div key={user.email}>
              <p>Email: {user.email}</p>
              <p>Order: </p>
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
  return {fetchAllUsers: () => dispatch(fetchAllUsers())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
