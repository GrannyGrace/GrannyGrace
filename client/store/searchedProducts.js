import Axios from 'axios'

//Action Define
const SET_SEARCH = 'SET_SEARCH'

//Action Creators
export const setSearchProducts = searchResults => {
  return {type: SET_SEARCH, results: searchResults}
}

//thunks
export function fetchSearchResult(term) {
  return async dispatch => {
    try {
      const {data} = await Axios.get(`/api/products/search/${term}`)
      console.log(data)
      return dispatch(setSearchProducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default function searchedProducts(results = [], action) {
  switch (action.type) {
    case SET_SEARCH:
      return action.results
    default:
      return results
  }
}
