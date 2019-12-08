import React, {useEffect} from 'react'
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
    console.log('singel product', data)
    if (props.user.id) {
      props.fetchUpdateCart(product.id, data)
    } else {
      console.log('single-product component')
      console.log('guest qty', data)
      props.fetchGuestCart(product.id, data)
    }
  }

  return (
    <Container>
      {console.log('availability', product.availability)}
      {console.log('quantity', product.quantity)}
      {product.availability && +product.quantity !== 0 ? (
        <div className="single-product-container">
          <h3>Product: {product.name}</h3>
          <img className="product-image" src={product.imageUrl} alt="apple" />
          <p style={{fontWeight: 'bold'}}>$ {product.price}</p>
          <p style={{fontWeight: 'bold'}}>
            Category:
            {product.category[0]
              ? product.category.join(', ')
              : product.category}{' '}
          </p>
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
        </div>
      ) : (
        <h4>This product is currently unavailble for purchase</h4>
      )}

      {props.user.isAdmin && <UpdateSingleProduct />}
      <AllReviews allReviews={product.reviews} />
      <SubmitReview />
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
