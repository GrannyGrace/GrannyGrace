import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import cartIcon from './images/cartIcon.png'

const App = () => {
  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-4">
            <h1 className="granny-grace-header">GRANNY GRACE</h1>
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
            <div className="col services-col">Ships Nation-Wide</div>
            <div className="col services-col">Secure Payment System</div>
            <div className="col services-col">High Quality Apples</div>
            <div className="col services-col">Return Policy</div>
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
