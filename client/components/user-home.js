import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import '../css/userhome.css'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const email = props.user.email
  console.log(props)
  return (
    <div className="container needs-margin-top">
      <div className="left-column">
        <h3>Welcome, {email}</h3>
      </div>
      <div className="right-column">
        <button
          type="button"
          //oncClick={resetPassword}
          className="reset-password-button"
        >
          Reset Password
        </button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
