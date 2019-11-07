import axios from 'axios'

//Action Define
const SET_ALLPRODUCTS = 'SET_ALLPRODUCTS'
const SET_SEARCHED_PRODUCTS = 'SET_SEARCHED_PRODUCTS'

//Action Creators
export const setAllProducts = allproducts => {
  return {
    type: SET_ALLPRODUCTS,
    products: allproducts
  }
}
export const setSearchedProducts = searchedProducts => {
  return {
    type: SET_SEARCHED_PRODUCTS,
    searchedProducts: searchedProducts
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
export function fetchSearchedProducts(term) {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/search/${term}`)
      dispatch(setSearchedProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer
export default function productsReducer(products = [], action) {
  switch (action.type) {
    case SET_ALLPRODUCTS:
      return [...action.products]
    case SET_SEARCHED_PRODUCTS:
      return [...action.searchedProducts]
    default:
      return products
  }
}
