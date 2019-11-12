import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
  fetchAllOrders,
  fetchTypeOfOrders,
  fetchUpdateOrder
} from '../store/allOrders.js'
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
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12">
          <h3>Admin Portal</h3>
          <p style={{fontWeight: 'bold'}}>Hi {props.user.username}</p>

          <p>Order Filter: </p>
          <select
            id="orderFilter"
            onChange={event => handleFilterOrders(event)}
            value={orderFilter}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>

          {props.allOrders.map(eachOrder => {
            return (
              <div className="active-order-div" key={eachOrder.id}>
                <p>Order id: {eachOrder.id}</p>
                <p>Order status: {eachOrder.status}</p>
                <p>Items: </p>
                {console.log(eachOrder.lockedProducts)}
                {eachOrder.lockedProducts.map(product => {
                  return (
                    <div className="card active-order-div" key={product.id}>
                      <img src={product.imageUrl} />
                      <p className="textInCard">
                        <span className="needs-bold">Item Name: </span>
                        {product.name}
                      </p>
                      {/* <p >{product.name}</p> */}
                      <p className="textInCard">
                        <span className="needs-bold">Price Paid: </span>$
                        {product.price}
                      </p>
                    </div>
                  )
                })}
                <select
                  id="eachOrderStatus"
                  value={eachOrder.status}
                  onChange={event => {
                    props.fetchUpdateOrder({
                      orderId: eachOrder.id,
                      newStatus: event.target.value
                    })
                    props.fetchAllOrders()
                  }}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
                <p>Order total: ${eachOrder.price}</p>
              </div>
            )
          })}
        </div>
        {/* </div> */}

        <div className="col-md-6 col-sm-12 col-xs-12">
          <h4>See All Users: </h4>
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
    fetchUpdateOrder: info => dispatch(fetchUpdateOrder(info)),
    deleteUser: id => dispatch(deleteUser(id)),
    updateUser: data => dispatch(updateUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
