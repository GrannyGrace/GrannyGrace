import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <React.Fragment>
      <Card.Body>Welcome, {user.email}</Card.Body>
    </React.Fragment>
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
