import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders, fetchTypeOfOrders} from '../store/allOrders.js'
import {fetchAllUsers, deleteUser, updateUser} from '../store/allUsers'
import '../css/adminportal.css'
// import {fetchAllOrders} from '../store/orders'
//need to create fetchAllOrders

const AdminPortal = props => {
  const [orderFilter, setOrderFilter] = useState('all')
  // const [displayOrders, setDisplayOrders] = useState([])

  useEffect(() => {
    props.fetchAllUsers()
    props.fetchAllOrders()
    // console.log('displayOrders before', displayOrders)
    // setDisplayOrders(props.allOrders)
    // console.log('displayOrders after', displayOrders)
  }, [])

  const handleFilterOrders = event => {
    // console.log('TCL: status', event)
    // setOrderFilter(props.allOrders.filter(order => order.status === status))
    setOrderFilter(event.target.value)
    props.fetchTypeOfOrders(event.target.value)
  }

  return (
    // <div className="container-all">
    <div className="container needs-top-margin">
      <div className="row welcome-admin-div">
        <div className="title-row">
          <h3>Admin Portal</h3>
        </div>
        <div className="welcome-row">
          <p style={{fontWeight: 'bold'}}>Hi {props.user.username}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <h4>All Orders: </h4>
          <div className="order-filter-div">
            <div className="left-order-filter-column">
              <p>Order Filter: </p>
            </div>
            <div className="right-order-filter-column">
              <select
                id="orderFilter"
                className="change-admin-status"
                onChange={event => handleFilterOrders(event)}
                value={orderFilter}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>

          {props.allOrders.map(eachOrder => {
            return (
              <div className="active-user-div" key={eachOrder.id}>
                <p>Order id: {eachOrder.id}</p>
                <p>Order status: {eachOrder.status}</p>
                <p>Order total: ${eachOrder.price}</p>
              </div>
            )
          })}
        </div>

        <div className="col-md-6 col-sm-12 col-xs-12">
          <h4>All Users: </h4>
          {props.allUsers[0] &&
            props.allUsers.map(user => {
              return (
                <div className="active-user-div" key={user.email}>
                  <p>Email: {user.email}</p>
                  <p>Order: </p>
                  <select
                    className="change-admin-status"
                    value={user.isAdmin}
                    onChange={() =>
                      props.updateUser({
                        userId: user.id,
                        isAdmin: !user.isAdmin
                      })
                    }
                  >
                    <option value={true}>Admin</option>
                    <option value={false}>User</option>
                  </select>
                  <button
                    className="delete-user-button"
                    onClick={() => props.deleteUser(user.id)}
                    type="submit"
                  >
                    Delete User
                  </button>
                </div>
              )
            })}
        </div>
      </div>
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
    fetchTypeOfOrders: filter => dispatch(fetchTypeOfOrders(filter)),
    deleteUser: id => dispatch(deleteUser(id)),
    updateUser: data => dispatch(updateUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
