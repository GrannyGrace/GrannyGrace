import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {fetchUpdateCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import {ProductFilter} from './product-filter'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
    this.handleSort = this.handleSort.bind(this)
  }

  state = {
    view: 'grid',
    sortValue: 'lowToHigh'
  }

  componentDidMount() {
    this.props.getProductsFromServer()
  }
  //if no products in db, we need to seed.
  componentDidUpdate(prevProps) {
    const newProducts = this.props.allProducts
  }
  addToCart(productId) {
    if (this.props.user.id) {
      this.props.fetchUpdateCart(this.props.user.id, productId)
    } else {
      console.log(
        'user can only add to cart if logged in right now, need to add session support'
      )
    }
  }
  handleSort = e => {
    console.log('new sort value', e.target.value)
    const newSortValue = e.target.value
    const {allProducts} = this.props
    let newProducts = []
    switch (newSortValue) {
      case 'lowToHigh':
        newProducts = allProducts.sort((a, b) => a.price - b.price)
        break
      case 'highToLow':
        newProducts = allProducts.sort((a, b) => b.price - a.price)
        break
      case '':
        newProducts = allProducts.sort((a, b) => a.price - b.price)
        break
      default:
    }
    this.setState({sortValue: newSortValue})
  }

  render() {
    const {sortValue, view} = this.state
    //console.log('products***', products)
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
                Sort By Price:{' '}
                <select value={sortValue} onChange={this.handleSort}>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </div>
              </div>
              <div
                onClick={() => this.setState({view: 'grid'})}
                className="grid"
              >
                <FontAwesomeIcon icon={faGripHorizontal} /> Grid
              </div>
              <div
                onClick={() => this.setState({view: 'list'})}
                className="list"
              >
                <FontAwesomeIcon icon={faList} /> List
              </div>
            </div>
            <div id="products">
              <div className="inner-products-container">
                Products
                <div className="container-fluid">
                  {view === 'grid' ? (
                    <div className="card-columns">
                      {this.props.allProducts.map(elem => {
                        return (
                          <div key={elem.id} className="card">
                            <Link key={elem.id} to={`/products/${elem.id}`}>
                              <img
                                className="card-img-top"
                                src={elem.imageUrl}
                              />
                              <div className="card-body">
                                <h4
                                  className="card-title"
                                  style={{color: 'black'}}
                                >
                                  {elem.name} for {elem.price}
                                </h4>
                                <p className="card-text">{elem.decription}</p>
                              </div>
                            </Link>
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() => {
                                this.addToCart(elem.id)
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="list-group">
                      {this.props.allProducts.map(elem => {
                        return (
                          <div key={elem.id} className="list-group-item card">
                            <Link key={elem.id} to={`/products/${elem.id}`}>
                              <img
                                className="card-img-top-list"
                                src={elem.imageUrl}
                              />
                              <div className="card-body">
                                <h4
                                  className="card-title"
                                  style={{color: 'black'}}
                                >
                                  {elem.name} for {elem.price}
                                </h4>
                                <p className="card-text">{elem.decription}</p>
                              </div>
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.allProducts.sort((a, b) => a.price - b.price),
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromServer: () => dispatch(fetchProducts(dispatch)),
    fetchUpdateCart: (userId, productId) =>
      dispatch(fetchUpdateCart(userId, productId)),
    sessionChecker: () => dispatch(sessionChecker()),
    auth: (email, password, method, isGuest) =>
      dispatch(auth(email, password, method, isGuest))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
