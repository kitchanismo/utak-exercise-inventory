import { createAction, createReducer } from '@reduxjs/toolkit'

import { Product } from '~/types/product.type'
import { Variant } from '~/types/variant.type'

export interface IProductStore {
  products: Product[]
}

const state: IProductStore = {
  products: [],
}

export const setProductsAction = createAction<Product[]>('SET_PRODUCTS')
export const addProductAction = createAction<Product>('ADD_PRODUCT')
export const deleteVariantAction = createAction<{
  productId: string
  variantId: string
}>('DELETE_VARIANT')
export const addVariantAction = createAction<{ id: string; variant: Variant }>(
  'ADD_VARIANT'
)

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
