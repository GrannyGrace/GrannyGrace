import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {fetchProducts} from '../store/products'
import '../css/navbar.css'

const Navbar = ({handleClick, isLoggedIn, isAdmin, getProductsFromServer}) => (
  <div className="lower-nav">
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <Link to="/products" onClick={getProductsFromServer}>
            All Products
          </Link>
          <Link to="/orders">My Orders</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/adminportal">Admin Portal</Link>
        </div>
      ) : (
        <nav className="navbar navbar-light light-blue lighten-4">
          <button
            className="navbar-toggler toggler-example"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="dark-blue-text">
              <i className="fas fa-bars fa-1x" />
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </span>
          </button>

          <div className="bottom-navbar-container">
            {/* The navbar will show these links before you log in */}
            <span className="bottom-navbar-items">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <hr className="display-at-mobile" />
              <Link to="/signup">Sign Up</Link>
              <hr className="display-at-mobile" />
              <Link to="/products" onClick={getProductsFromServer}>
                All Products
              </Link>
              <hr className="display-at-mobile" />
            </span>
          </div>
        </nav>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getProductsFromServer: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  getProductsFromServer: PropTypes.func.isRequired
}
