import React, {useEffect} from 'react'
import {link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'

const AllProducts = props => {
  useEffect(() => {
    props.getProductsFromServer()
    console.log(props.allProducts)
    console.log(props)
  }, [])

  return (
    <div className="inner-products-container">
      Products
      <div className="container-fluid">
        <div className="card-columns">
          {props.allProducts.map(elem => {
            return (
              <div key={elem.id} className="card">
                <img className="card-img-top" src={elem.imageUrl} />
                <div className="card-body">
                  <h4 className="card-title">
                    {elem.name} for {elem.price}
                  </h4>
                  <p className="card-text">{elem.decription}</p>
                </div>
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
    allProducts: state.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromServer: () => dispatch(fetchProducts(dispatch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
