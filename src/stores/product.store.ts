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
export const deleteProductAction = createAction<string>('DELETE_PRODUCT')
export const deleteVariantAction = createAction<{
  productId: string
  variantId: string
}>('DELETE_VARIANT')

const productStore = createReducer(state, (builder) => {
  builder.addCase(setProductsAction, (state, action) => ({
    ...state,
    products: action.payload,
  }))
  builder.addCase(addProductAction, (state, action) => ({
    ...state,
    products: [action.payload, ...state?.products],
  }))
  builder.addCase(deleteProductAction, (state, action) => ({
    ...state,
    products: state?.products?.filter(
      (product) => product?.id !== action.payload
    ),
  }))
  builder.addCase(deleteVariantAction, (state, action) => ({
    ...state,
    products: state?.products?.map((product) => {
      const updatedVariants = state?.products
        ?.find((product) => product?.id === action.payload?.productId)
        ?.variants?.filter(
          (variant) => variant?.id !== action.payload?.variantId
        )
      return { ...product, variants: updatedVariants }
    }),
  }))
})

export default productStore
