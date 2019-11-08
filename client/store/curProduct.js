import axios from 'axios'

//action define

const SET_SINGLE_PRODUCT = 'SET_PRODUCT'

//action creator

const setSingleProduct = curProduct => {
  return {type: SET_SINGLE_PRODUCT, curProduct}
}

//thunks

export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      if (!data) {
        console.log('product never received')
      }
      dispatch(setSingleProduct(data))
    } catch (error) {
      console.error(error)
      console.log('messed up in fetchSingleProduct thunk')
    }
  }
}

export const addReview = (review, productId, userId) => {
  return async dispatch => {
    console.log(review)
    try {
      const {data} = await axios.post(
        `/api/reviews/${productId}/${userId}`,
        review
      )
      console.log(data)
      dispatch(setSingleProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProduct = (id, productData) => {
  return async dispatch => {
    try {
      console.log('TCL: productData', productData)

      const {data} = await axios.put(`/api/products/${id}`, productData)

      if (!data) {
        console.log('product data did not update')
      }

      dispatch(setSingleProduct(data))
    } catch (error) {
      console.log('messed up in updateProduct thunk')
      console.error(error)
    }
  }
}

//reducer

export default function(curProduct = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.curProduct

    default:
      return curProduct
  }
}
