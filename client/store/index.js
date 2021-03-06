import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import curProduct from './curProduct'
import curCart from './curCart'
import allUsers from './allUsers'
import allOrders from './allOrders'
import {OrdersReducer} from './orders'

const reducer = combineReducers({
  user,
  products,
  curProduct,
  curCart,
  orders: OrdersReducer,
  allUsers,
  allOrders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
