import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux'

import ReduxThunk from 'redux-thunk'
import productStore, { IProductStore } from './product.store'

export interface ApplicationReducers {
  productStore: IProductStore
}

const reducers: Reducer<ApplicationReducers> = combineReducers({
  productStore,
})

const makeStore = (reducer) => createStore(reducer, applyMiddleware(ReduxThunk))

export const store = makeStore(reducers)
