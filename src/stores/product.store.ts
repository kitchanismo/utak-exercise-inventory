import { createAction, createReducer } from '@reduxjs/toolkit'

import { Product } from '~/types/product.type'
import { Variant } from '~/types/variant.type'

export interface IProductStore {
  products: Product[]
  openProductForm: boolean
  selectedProduct: Product | null
}

const state: IProductStore = {
  products: [],
  openProductForm: false,
  selectedProduct: null,
}

export const setProductsAction = createAction<Product[]>('SET_PRODUCTS')
export const setOpenProductForm = createAction<boolean>('SET_OPEN_PRODUCT_FORM')
export const setSelectedProduct = createAction<Product | null>('SET_PRODUCT')
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
  builder.addCase(setOpenProductForm, (state, action) => ({
    ...state,
    openProductForm: action.payload,
  }))
  builder.addCase(setSelectedProduct, (state, action) => ({
    ...state,
    selectedProduct: action.payload,
  }))
})

export default productStore
