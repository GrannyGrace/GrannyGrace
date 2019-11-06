import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {fetchUpdateCart} from '../store/curCart'
import {ProductFilter} from './product-filter'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'

const AllProducts = props => {
  useEffect(() => {
    props.getProductsFromServer()
    console.log(props.allProducts)
    console.log(props)
  }, [])
  const addToCart = async productId => {
    if (!props.user.id) {
      //props.addUser()
    }
    await props.fetchUpdateCart(props.user.id, productId)
  }
  return (
    <div className="container outer-products-container">
      <div className="row">
        <div className="col-md-4 col-sm-12 product-filters-outer-container">
          <span className="product-filters-inner-title">Product Filters</span>
          <div className="product-filters-inner-container">Category</div>
          {/* <ProductFilter/> */}
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
              </div>
            </div>
            <div className="grid">
              <FontAwesomeIcon icon={faGripHorizontal} /> Grid
            </div>
            <div className="list">
              <FontAwesomeIcon icon={faList} /> List
            </div>
          </div>
          <div id="products">
            <div className="inner-products-container">
              Products
              <div className="container-fluid">
                <div className="card-columns">
                  {props.allProducts.map(elem => {
                    return (
                      <div key={elem.id} className="card">
                        <Link key={elem.id} to={`/products/${elem.id}`}>
                          <img className="card-img-top" src={elem.imageUrl} />
                          <div className="card-body">
                            <h4 className="card-title" style={{color: 'black'}}>
                              {elem.name} for {elem.price}
                            </h4>
                            <p className="card-text">{elem.decription}</p>
                          </div>
                        </Link>
                        <button
                          type="button"
                          onClick={() => addToCart(elem.id)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    allProducts: state.allProducts,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromServer: () => dispatch(fetchProducts(dispatch)),
    fetchUpdateCart: (userId, productId) =>
      dispatch(fetchUpdateCart(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
