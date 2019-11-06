import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {fetchUpdateCart} from '../store/curCart'

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
                <button type="button" onClick={() => addToCart(elem.id)}>
                  add to cart
                </button>
              </div>
            )
          })}
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
