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
  productId: number
  variantId: number
}>('DELETE_VARIANT')
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
          variants: [
            ...(product?.variants || []),
            {
              ...action.payload?.variant,
              id: product?.variants?.length || 0 + 1,
            },
          ],
        }
      }
      return product
    }),
  }))
  builder.addCase(deleteVariantAction, (state, action) => ({
    ...state,
    products: state?.products.map((product) => {
      const variants = product?.variants?.filter(
        (variant) =>
          variant.id !== action.payload?.variantId &&
          product?.id !== action.payload.productId
      )
      return { ...product, variants }
    }),
  }))
})

export default productStore
