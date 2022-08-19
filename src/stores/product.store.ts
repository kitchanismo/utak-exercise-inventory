import { createAction, createReducer } from '@reduxjs/toolkit'

import { Product } from '~/types/product.type'
import { Variant } from '~/types/variant.type'

export interface IProductStore {
  products: Product[]
  openProductForm: boolean
  openVariantForm: boolean
  selectedProduct: Product | null
  selectedVariant: Variant | null
  selectedTab: string
}

const state: IProductStore = {
  products: [],
  openVariantForm: false,
  openProductForm: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedTab: 'All',
}

export const setProductsAction = createAction<Product[]>('SET_PRODUCTS')
export const setOpenProductForm = createAction<boolean>('SET_OPEN_PRODUCT_FORM')
export const setOpenVariantForm = createAction<boolean>('SET_OPEN_VARIANT_FORM')
export const setSelectedProduct = createAction<Product | null>('SET_PRODUCT')
export const setSelectedVariant = createAction<Variant | null>('SET_VARIANT')
export const addProductAction = createAction<Product>('ADD_PRODUCT')
export const deleteProductAction = createAction<string>('DELETE_PRODUCT')
export const deleteVariantAction = createAction<{
  productId: string
  variantId: string
}>('DELETE_VARIANT')
export const setSelectedTab = createAction<string>('SET_SELECTED_TAB')

const productStore = createReducer(state, (builder) => {
  builder.addCase(setProductsAction, (state, action) => ({
    ...state,
    products: action.payload?.filter((product) => {
      if (state?.selectedTab === 'All') return true

      return product?.category === state?.selectedTab
    }),
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
  builder.addCase(setOpenVariantForm, (state, action) => ({
    ...state,
    openVariantForm: action.payload,
  }))

  builder.addCase(setSelectedVariant, (state, action) => ({
    ...state,
    selectedVariant: action.payload,
  }))
  builder.addCase(setSelectedTab, (state, action) => ({
    ...state,
    selectedTab: action.payload,
  }))
})

export default productStore
