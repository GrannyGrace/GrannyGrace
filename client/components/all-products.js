import React from 'react'
import {link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts} from ' '

class AllProducts extends React.Component {
  componentDidMount() {}

  render() {
    return <text>Big Placeholder Apples Boi</text>
  }
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
