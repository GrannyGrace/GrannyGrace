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
    </div>
  )
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(MyAccount)
