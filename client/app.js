import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import cartIcon from './images/cartIcon.png'
import {getUser} from './store/user'
import flag from './images/flag.png'
import payment from './images/payment.png'
import apple from './images/apple.png'
import returnIcon from './images/return.png'
import logo from './images/logo.png'

const App = props => {
  //making the user on state default to admin user, change this useEffect to test different types of users
  useEffect(() => {
    if (!props.user.id) {
      // props.getUser({
      //   email: 'Dickie@dickie.com',
      //   username: 'Dickie',
      //   isAdmin: true
      // })
    }
  }, [])
  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-md-4 col-sm-12 col-xs-12 home-section">
            <img alt="apple-logo" className="apple-logo" src={logo} />
            <h1 className="granny-grace-header">GRANNY GRACE</h1>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12 my-account-parent">
            <div className="my-account">My Account</div>
            <div className="cart-icon-div">
              <Link to={`/home/cart/${props.user.id}`}>
                <img className="cart-icon" alt="cart-icon" src={cartIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row bottom-navbar-row">
        <Navbar />
      </div>

      <div className="row services-menu">
        <div className="container">
          <div className="row services-row">
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon" alt="flag" src={flag} />
              </span>Ships Nation-Wide
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon" alt="payment" src={payment} />
              </span>Secure Payments
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon apple" alt="apple" src={apple} />
              </span>High Quality Apples
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img
                  className="service-icon"
                  alt="return-icon"
                  src={returnIcon}
                />
              </span>Return Policy
            </div>
          </div>
        </div>
      </div>

      <div className="container outer-products-container">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <span className="product-filters-title">Product Filters</span>
            <div className="product-filter-container">Product Filters</div>
          </div>
          <div className="col-md-8 col-sm-12">
            <div className="toggle-product-styles">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Default Sorting
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
              <div className="grid">Grid</div>
              <div className="list">List</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" id="products">
        <Routes />
      </div>
    </div>
  )
}

export default connect(({user}) => ({user}), {getUser})(App)
