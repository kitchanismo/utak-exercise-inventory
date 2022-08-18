import { createAction, createReducer } from '@reduxjs/toolkit'
import { Category } from '~/types/category.type'
import { Product } from '~/types/product.type'

export interface IProductStore {
  products: Product[]
  categories: Category[]
}

const state: IProductStore = {
  products: [],
  categories: [],
}

export const setProductsAction = createAction<Product[]>('SET_PRODUCTS')
export const setCategoriesAction = createAction<Category[]>('SET_CATEGORIES')
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
  builder.addCase(setCategoriesAction, (state, action) => ({
    ...state,
    categories: action.payload,
  }))
})

export default productStore
