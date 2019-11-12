import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/allOrders.js'
import {fetchAllUsers, deleteUser, updateUser} from '../store/allUsers'
import '../css/adminportal.css'
// import {fetchAllOrders} from '../store/orders'
//need to create fetchAllOrders

const AdminPortal = props => {
  useEffect(() => {
    props.fetchAllUsers()
    props.fetchAllOrders()
  }, [])

  const [orderFilter, setOrderFilter] = useState('all')

  const handleFilterOrders = event => {
    console.log('TCL: status', event.target.value)
    // setOrderFilter(props.allOrders.filter(order => order.status === status))
    setOrderFilter(status)
  }

  return (
    <div className="container needs-top-margin">
      <h3>Admin Portal</h3>
      <p style={{fontWeight: 'bold'}}>Hi {props.user.username}</p>
      <select
        id="orderFilter"
        onChange={() => handleFilterOrders(orderFilter)}
        value={orderFilter}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="canceled">Canceled</option>
      </select>

      <h4>See All Active Orders: </h4>
      {props.allOrders.map(eachOrder => {
        return (
          <div key={eachOrder.id}>
            <p>Order id: {eachOrder.id}</p>
            <p>Order status: {eachOrder.status}</p>
            <p>Order total: ${eachOrder.price}</p>
            <hr />
          </div>
        )
      })}

      <h4>See All Users: </h4>
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
  return {
    user: state.user,
    allUsers: state.allUsers,
    allOrders: state.allOrders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    deleteUser: id => dispatch(deleteUser(id)),
    updateUser: data => dispatch(updateUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
