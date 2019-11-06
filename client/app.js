import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import cartIcon from './images/cartIcon.png'
import {getUser} from './store/user'

const App = props => {
  //making the user on state default to admin user, change this useEffect to test different types of users
  useEffect(() => {
    props.getUser({
      email: 'Dickie@dickie.com',
      username: 'Dickie',
      isAdmin: true
    })
  }, [])
  return (
    <div>
      <div className="container">
        <div className="row top-navbar-row">
          <div className="col-4">
            <h1 className="granny-grace-header">GRANNY GRACE</h1>
          </div>
          <div className="col-8 my-account-parent">
            <span className="my-account">My Account</span>

            {/* <span className="cart-icon"><img src={cartIcon}/></span> */}
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
      <div className="container" id="products">
        <Routes />
      </div>
    </div>
  )
}

export default connect(({user}) => ({user}), {getUser})(App)
