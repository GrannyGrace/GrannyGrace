import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_PRODUCT'

const setSingleProduct = curProduct => {
  return {type: SET_SINGLE_PRODUCT, curProduct}
}

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

export default function(curProduct = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.curProduct

    default:
      return curProduct
  }
}
