import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux'
import globalStore, { IGlobalStore } from './global.store'
import ReduxThunk from 'redux-thunk'
import productStore, { IProductStore } from './product.store'

export interface ApplicationReducers {
  globalStore: IGlobalStore
  productStore: IProductStore
}

const reducers: Reducer<ApplicationReducers> = combineReducers({
  globalStore,
  productStore,
})

const makeStore = (reducer) => createStore(reducer, applyMiddleware(ReduxThunk))

export const store = makeStore(reducers)
