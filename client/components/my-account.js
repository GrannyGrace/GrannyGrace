import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from '../store/orders'

const MyAccount = props => {
  useEffect(() => {
    props.fetchOrders()
  }, [])
  console.log('props', props)
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
      {props.order === undefined || props.order.length === 0 ? null : (
        <table className="table">
          <thead>
            <tr>
              <th>Order #</th>
              <th> Description</th>
              <th style={{width: '150px'}}>Order Status</th>
              <th style={{width: '150px'}}>Total Price</th>
              <th>Quantity</th>
              <th style={{width: '150px'}}>Date Ordered</th>
            </tr>
          </thead>
          <tbody>
            {props.order.map(order => {
              return (
                <React.Fragment key={order.id}>
                  <tr className="table-secondary">
                    <td>{order.id}</td>
                    <td />
                    <td>{order.status}</td>
                    <td>${order.price}</td>
                    <td />
                    <td>{order.createdAt.slice(0, 10)}</td>
                  </tr>
                  {console.log('order.products', order)}

                  {order.products &&
                    order.products.map(product => {
                      return (
                        <tr key={product.id}>
                          <td>
                            {product.name}
                            <Link to={`/products/${product.id}`}>
                              <br />
                              <img
                                className="product-image"
                                src={product.imageUrl}
                                alt="apple"
                              />
                            </Link>
                          </td>
                          <td>{product.description}</td>
                          <td />
                          <td>${product.price}</td>
                          <td>quantity ..?</td>
                        </tr>
                      )
                    })}
                </React.Fragment>
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
  return {user: state.user, order: state.orders}
}
const mapDispatchToProps = dispatch => {
  return {fetchOrders: () => dispatch(fetchOrders())}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
