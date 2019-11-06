import axios from 'axios'

//Action Define
const SET_ALLPRODUCTS = 'SET_ALLPRODUCTS'

//Action Creators
export const setAllProducts = allproducts => {
  return {
    type: SET_ALLPRODUCTS,
    allproducts: allproducts
  }
}

//thunks
export function fetchProducts() {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setAllProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default function allProductsReducer(allproducts = [], action) {
  switch (action.type) {
    case SET_ALLPRODUCTS:
      return [...action.allproducts]
    default:
      return allproducts
  }
}
