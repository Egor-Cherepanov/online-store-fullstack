import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { thunk } from "redux-thunk"
import {
  appReducer,
  productReducer,
  productsReducer,
  userReducer,
} from "./reducers"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const reducer = combineReducers({
  products: productsReducer,

  product: productReducer,

  app: appReducer,

  user: userReducer,
})

export type RootState = ReturnType<typeof reducer>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)

// import { create } from "zustand"

// const useProducts = create()
