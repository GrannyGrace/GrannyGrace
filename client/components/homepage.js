import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, fetchSearchedProducts} from '../store/products'
import {fetchUpdateCart, fetchGuestCart} from '../store/curCart'
import {sessionChecker, auth} from '../store/user'
import {ProductFilter} from './product-filter'
import SearchBar from './searchbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGripHorizontal, faList} from '@fortawesome/free-solid-svg-icons'
import '../css/homepage.css'
import _ from 'lodash'
class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }

  state = {
    view: 'grid',
    sortValue: 'lowToHigh',
    products: []
  }

  componentDidMount() {
    const {products} = this.props
    if (products.length) {
      this.setState({products})
    } else {
      this.props.getProductsFromServer()
    }
  }
  //if no products in db, we need to seed.
  componentDidUpdate(oldProps) {
    console.log('did updadte called', oldProps)
    const newProducts = this.props.products
    if (newProducts.length && newProducts.length !== oldProps.products.length) {
      this.setState({products: newProducts})
    }
  }

  addToCart(productId) {
    const qty = {qty: '1'}
    if (this.props.user.id) {
      this.props.fetchUpdateCart(productId, qty)
    } else {
      this.props.fetchGuestCart(productId, qty)
    }
  }

  filterProducts = category => {
    console.log('this.props.products', this.props.products)
    this.setState({
      products: this.props.products.filter(p => p.category.includes(category))
    })
  }

  render() {
    const {sortValue, view, products} = this.state
    let productCats = []
    this.props.products.forEach(
      p => (productCats = productCats.concat(p.category))
    )
    productCats = _.uniq(productCats).sort((a, b) => (a < b ? -1 : 1))
    return (
      <>
        {/* APPLES BANNER IMAGE */}
        <div className="row">
          <div className="image-container">
            <img
              className="apple-banner"
              alt="apple-banner"
              src="/apples_banner.jpg"
            />
            <div className="centered">
              <span className="top-title-row">APPLES FOR ALL</span>
              <span className="bottom-title-row">
                DISTRIBUTING HIGH QUALITY APPLES NATION-WIDE
              </span>
            </div>
          </div>
        </div>

        {/* WELCOME ROW */}
        <div className="row welcome-row">
          <div className="container welcome-container">
            <h1 className="welcome">WELCOME</h1>
            <p className="description">
              Since 1979, Granny Grace’s Apple Emporium has been the #1
              distributor of apples in the Midwest. In recent years, the
              Emporium has expanded to include orchards in over 7 different
              states, delivering apples and apple bi-products to over 50,000,000
              happy customers.
            </p>
          </div>
        </div>

        {/* PRODUCT FILTER AND PRODUCTS ROW */}
        <div className="row products-row">
          <div className="container outer-products-container">
            <div className="row">
              <div className="col-md-4 col-sm-12 product-filters-outer-container">
                <div className="product-filters-sticky-container">
                  <span className="product-filters-inner-title">
                    Product Filters
                  </span>
                  <div className="product-filters-inner-container">
                    <span className="category-title">Category</span>
                    {productCats.map((p, i) => (
                      <div
                        className="product-category"
                        onClick={() => this.filterProducts(p)}
                        key={i}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                  <SearchBar />
                </div>
              </div>
              <div className="col-md-8 col-sm-12">
                <div id="products">
                  <div className="inner-products-container">
                    <div className="top-picks-container">
                      <span className="top-picks">Our top picks for you:</span>
                    </div>
                    <div className="container-fluid">
                      {view === 'grid' ? (
                        <div className="row col-sm-12">
                          {products.slice(0, 9).map(elem => {
                            return (
                              <div
                                key={elem.id}
                                className="card card-all-products col-sm-4"
                              >
                                <Link key={elem.id} to={`/products/${elem.id}`}>
                                  <img
                                    className="card-img-top"
                                    src={elem.imageUrl}
                                    style={{height: '100%'}}
                                  />
                                </Link>
                                <div className="card-body">
                                  <h4
                                    className="card-title"
                                    style={{color: 'black'}}
                                  >
                                    {elem.name}
                                  </h4>
                                  <p className="card-subtitle mb-2 text-muted">
                                    $ {elem.price}
                                  </p>

                                  {this.props.user.isAdmin ? (
                                    <p className="card-subtitle mb-2 text-muted">
                                      Inventory: {elem.quantity}
                                    </p>
                                  ) : null}
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
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="list-group">
                          {products.map(elem => {
                            return (
                              <div
                                key={elem.id}
                                className="list-group-item card"
                              >
                                <Link
                                  key={elem.id}
                                  to={`/products/${elem.id}`}
                                  style={{height: '300px'}}
                                >
                                  <img
                                    className="card-img-top-list"
                                    src={elem.imageUrl}
                                    style={{height: '100%'}}
                                  />
                                  <div className="card-body">
                                    <h4
                                      className="card-title"
                                      style={{color: 'black'}}
                                    >
                                      {elem.name} for {elem.price}
                                    </h4>
                                    <p className="card-text">
                                      {elem.decription} - {elem.category}
                                    </p>
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
        </div>
      </>
    )
  }
}

// How the component knows about data in the store
const mapStoreToProps = store => {
  return {
    products: store.products.sort((a, b) => a.price - b.price),
    user: store.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromServer: () => dispatch(fetchProducts()),

    fetchUpdateCart: (productId, qty) =>
      dispatch(fetchUpdateCart(productId, qty)),

    fetchGuestCart: (productId, qty) =>
      dispatch(fetchGuestCart(productId, qty)),

    sessionChecker: () => dispatch(sessionChecker()),
    auth: (email, password, method, isGuest) =>
      dispatch(auth(email, password, method, isGuest)),
    search: term => dispatch(fetchSearchedProducts(term))
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AllProducts)
