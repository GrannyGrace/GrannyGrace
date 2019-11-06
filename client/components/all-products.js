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
    <div>
      {props.allProducts.map(elem => {
        return (
          <div key={elem.id}>
            <p className="font-weight-normal">{elem.name}</p>
          </div>
        )
      })}
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
