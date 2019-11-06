import React from 'react'
import {link} from 'react-router-dom'
import {connect} from 'react-redux'
import SingleProduct from './single-product'

class AllProducts extends React.Component {
  componentDidMount() {
    console.log('mounted')
  }

  render() {
    return <text>Big Placeholder Apples Boi</text>
  }
}
// const mapStateToProps = state => {
//   return {
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }

export default AllProducts
