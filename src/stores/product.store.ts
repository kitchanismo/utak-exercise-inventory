import { createAction, createReducer } from '@reduxjs/toolkit'

import { Product } from '~/types/product.type'

export interface IProductStore {
  products: Product[]
}

const state: IProductStore = {
  products: [],
}

export const setProductsAction = createAction<Product[]>('SET_PRODUCTS')
export const addProductAction = createAction<Product>('ADD_PRODUCT')

const productStore = createReducer(state, (builder) => {
  builder.addCase(setProductsAction, (state, action) => ({
    ...state,
    products: action.payload,
  }))
  builder.addCase(addProductAction, (state, action) => ({
    ...state,
    products: [action.payload, ...state?.products],
  }))
})

export default productStore
