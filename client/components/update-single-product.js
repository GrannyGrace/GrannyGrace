/* eslint-disable react/display-name */
import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/curProduct'

const UpdateSingleProduct = class extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const curProduct = this.props.curProduct
    console.log('TCL: curProduct ', curProduct)

    const newProduct = {
      name: this.state.name || curProduct.name,
      price: this.state.price || curProduct.price,
      imageUrl: this.state.imageUrl || curProduct.imageUrl
    }
    console.log('TCL: newProduct', newProduct)
    this.props.updateProduct(curProduct.id, newProduct)
    this.setState({
      name: '',
      price: '',
      imageUrl: ''
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  render() {
    return (
      <>
        <h2>Update:</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="text"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label htmlFor="imageUrl">Image Url</label>
          <input
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </>
    )
  }
}

export default connect(({curProduct, products}) => ({curProduct, products}), {
  updateProduct
})(UpdateSingleProduct)
