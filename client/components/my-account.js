import React from 'react'
import {connect} from 'react-redux'

const MyAccount = props => {
  return (
    <div>
      <h4>My Account</h4>
      <p style={{fontWeight: 'bold'}}>Email: </p>
      <p>{props.user.email}</p>
      <p style={{fontWeight: 'bold'}}>Username: </p>
      <p>{props.user.username}</p>
      <p style={{fontWeight: 'bold'}}>
        Account Status:{props.user.isAdmin ? '  Admin' : '  Customer'}{' '}
      </p>
      <h4>Order History: </h4>
      {console.log(props.user)}
      {props.user.orders === undefined ||
      props.user.orders.length === 0 ? null : (
        <table className="table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Order Status</th>
              <th>Total Price</th>
              <th>Date Ordered</th>
            </tr>
          </thead>
          <tbody>
            {props.user.orders.map(order => {
              return (
                <>
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>{order.price}</td>
                    <td>{order.createdAt.slice(0, 10)}</td>
                  </tr>
                  <tr key={order.id}>
                    <td>d</td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      )}
      <p />
    </div>
  )
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(MyAccount)
