import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import cartIcon from './images/cartIcon.png'
import flag from './images/flag.png'
import payment from './images/payment.png'
import apple from './images/apple.png'
import returnIcon from './images/return.png'
import logo from './images/logo.png'

const App = () => {
  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-4">
            <div className="home-section">
              <img alt="apple-logo" className="apple-logo" src={logo} />
              <h1 className="granny-grace-header">GRANNY GRACE</h1>
            </div>
          </div>
          <div className="col-8 my-account-parent">
            <span className="my-account">My Account</span>
            <span>
              <img className="cart-icon" alt="cart-icon" src={cartIcon} />
            </span>
          </div>
        </div>
      </div>

      <div className="row bottom-navbar-row">
        <Navbar />
      </div>

      <div className="row services-menu">
        <div className="container">
          <div className="row services-row">
            <div className="col services-col">
              <span className="service-icon">
                <img className="service-icon" alt="flag" src={flag} />
              </span>Ships Nation-Wide
            </div>
            <div className="col services-col">
              <span className="service-icon">
                <img className="service-icon" alt="payment" src={payment} />
              </span>Secure Payment System
            </div>
            <div className="col services-col">
              <span className="service-icon">
                <img className="service-icon apple" alt="apple" src={apple} />
              </span>High Quality Apples
            </div>
            <div className="col services-col">
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
          <div className="col-4 needs-padding">
            <div className="product-filter-container">Product Filters</div>
          </div>
          <div className="col-8 needs-padding">
            <div className="inner-products-container">Products</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
