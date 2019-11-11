import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar, Footer} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/app.css'

import {getUser, sessionChecker, auth} from './store/user'

import {fetchUpdateCart, fetchGuestCart, setCart} from './store/curCart'

const App = props => {
  const {curCart} = props
  //check session with useEffect(()=>{},[]), load cart data from Session, if there is any and put it on curCart, if user signs up, use addProductsToCart(curCart) thunk to add products from curCart onto user with magic method user.addProducts(req.body) -->req.body should be an array, then refetch updated, and res.json(user.products)

  useEffect(
    () => {
      if (props.user.id) {
        props.fetchUpdateCart(props.user.id)
      } else {
        props.fetchGuestCart(0)
      }
    },
    [props.user.id]
  )
  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-md-4 col-sm-12 col-xs-12 home-section">
            <a href="http://localhost:8080">
              <img alt="apple-logo" className="apple-logo" src="/logo.png" />
              <h1 className="granny-grace-header">GRANNY GRACE</h1>
            </a>
          </div>
          <div className="col-md-8 col-sm-12 col-xs-12 my-account-parent">
            <Link className="my-account" to="/myaccount">
              My Account
            </Link>
            <div className="cart-icon-div">
              <Link to={`/home/cart/${props.user.id}`}>
                <span className="cart-item-number">{curCart.length}</span>
                <img
                  className="cart-icon"
                  alt="cart-icon"
                  src="/cartIcon.png"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row bottom-navbar-row">
        <div className="container">
          <Navbar />
        </div>
      </div>

      <div className="row services-menu">
        <div className="container">
          <div className="row services-row">
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img className="service-icon" alt="flag" src="/flag.png" />
              </span>Ships Nation-Wide
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img
                  className="service-icon"
                  alt="payment"
                  src="/payment.png"
                />
              </span>Secure Payments
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <span className="service-icon">
                <img
                  className="service-icon apple"
                  alt="apple"
                  src="/apple.png"
                />
              </span>High Quality Apples
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12 services-col">
              <Link to="/returns">
                <span className="service-icon">
                  <img
                    className="service-icon"
                    alt="return-icon"
                    src="/return.png"
                  />
                </span>Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div id="mainRoutes">
        <Routes />
      </div>

      <>
        <Footer />
      </>
    </div>
  )
}

const mapStateToProps = store => ({
  user: store.user,
  curCart: store.curCart
})

export default connect(mapStateToProps, {
  getUser,
  auth,
  sessionChecker,
  fetchUpdateCart,
  fetchGuestCart,
  setCart
})(App)
