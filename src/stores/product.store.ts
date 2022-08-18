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
export const addVariantAction = createAction<{ id: number; variant: Variant }>(
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
  builder.addCase(addVariantAction, (state, action) => ({
    ...state,
    products: state?.products?.map((product) => {
      if (product?.id === action.payload?.id) {
        return {
          ...product,
          variants: [...(product?.variants || []), action.payload?.variant],
        }
      }
      return product
    }),
  }))
})

export default productStore
