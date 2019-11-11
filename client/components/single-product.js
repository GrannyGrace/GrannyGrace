import React, {useEffect, useState} from 'react'
import useForm from 'react-hook-form'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/curProduct'
import {fetchUpdateCart, fetchGuestCart} from '../store/curCart'
import {withRouter} from 'react-router-dom'
import UpdateSingleProduct from './update-single-product'
import AllReviews from './all-reviews'
import '../css/single-product.css'
import SubmitReview from './submit-review'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

const SingleProduct = props => {
  useEffect(() => {
    props.fetchSingleProduct(+props.match.params.id)
    console.log(props.curProduct)
  }, [])

  const product = props.curProduct

  const {register, handleSubmit, errors} = useForm()

  const onSubmit = data => {
    console.log(data)
    if (props.user.id) {
      console.log('item should now be in cart')
      props.fetchUpdateCart(props.user.id, product.id, data)
    } else {
      console.log('single-product component')
      props.fetchGuestCart(product.id, data)
    }
  }

  return (
    <Container>
      <div className="single-product-container">
        <h3>Product: {product.name}</h3>
        <img className="product-image" src={product.imageUrl} alt="apple" />
        <p style={{fontWeight: 'bold'}}>$ {product.price}</p>
        <p style={{fontWeight: 'bold'}}>Category:{product.category} </p>
        <p style={{fontWeight: 'bold'}}>Quantity: {product.quantity}</p>
        <p style={{fontWeight: 'bold'}}>Product Descriptions: </p>
        <p>{product.description}</p>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="amount">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              name="qty"
              as="select"
              className="col-md-3 col-sm-12"
              ref={register}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </Form.Control>
          </Form.Group>
          <Button className="btn btn-primary" type="submit">
            add to cart
          </Button>
        </Form>
        {props.user.isAdmin && <UpdateSingleProduct />}
        <AllReviews allReviews={product.reviews} />
        <SubmitReview />
      </div>
    </Container>
  )
}

export default withRouter(
  connect(({curProduct, user}) => ({curProduct, user}), {
    fetchSingleProduct,
    fetchUpdateCart,
    fetchGuestCart
  })(SingleProduct)
)
