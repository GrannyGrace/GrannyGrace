import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
//import cartIcon from '../public/assets/images/cartIcon.png';

const App = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Navbar />
          </div>
          <div className="col-8 my-account-parent">
            <span className="my-account">My Account</span>
            <Link to="/products/1">Test Link to Product 1</Link>
            {/* <span className="cart-icon"><img src={cartIcon}/></span> */}
          </div>
          <div className="routes-div">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
