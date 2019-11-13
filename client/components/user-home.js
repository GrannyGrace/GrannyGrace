import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {resetPassword} from '../store/user'
import '../css/userhome.css'

/**
 * COMPONENT
 */

//import useState from react
//useState returns an array, so that's why we're assigning our variables / function within an array
//hooks have variables as first argument, functions as the second variable

export const UserHome = props => {
  const {email, id, error} = props.user
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showForm, setShowForm] = useState(false)

  //if password reset is successful, assign new password
  //if it fails alert error message

  const handleResetPassword = e => {
    e.preventDefault()
    if (newPassword === confirmNewPassword) {
      props
        .resetPassword({userId: id, currentPassword, newPassword})
        .then(() => {
          alert('Password Updated!')
          setCurrentPassword('')
          setNewPassword('')
          setConfirmNewPassword('')
        })
        .catch(() => alert('Invalid Email/Password'))
    } else {
      alert('Passwords Must Match!')
    }
  }

  return (
    <div className="container needs-margin-top">
      <div className="left-column">
        <div className="email-div">
          <h3>Welcome, {email}</h3>
        </div>
      </div>
      <div className="right-column">
        <div className="form-container">
          {showForm && (
            <form onSubmit={handleResetPassword}>
              <div className="form-row">
                Current Password:{' '}
                <input
                  className="form-input"
                  type="password"
                  required
                  name="currentPassword"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />{' '}
                <br />
              </div>
              <div className="form-row">
                New Password:{' '}
                <input
                  className="form-input"
                  type="password"
                  required
                  name="newPassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <br />
              </div>
              <div className="form-row">
                Confirm New Password:{' '}
                <input
                  className="form-input"
                  type="password"
                  required
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                />
                <br />
              </div>
              <button type="submit" className="reset-password-button">
                {' '}
                Reset{' '}
              </button>
            </form>
          )}
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="activate-reset-button"
          >
            {' '}
            {showForm ? 'Cancel' : 'Reset Password'}{' '}
          </button>
        </div>
        <div>{error}</div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    resetPassword: data => dispatch(resetPassword(data))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
