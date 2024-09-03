import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProductState } from './product.store'
import { Product } from '~/types/product.type'
import { Variant } from '~/types/variant.type'

export const initialState: IProductState = {
  products: [],
  openVariantForm: false,
  openProductForm: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedTab: 'All',
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload?.filter((product) => {
        if (state?.selectedTab === 'All') return true

        return product?.category === state?.selectedTab
      })
    },
    setOpenProductForm: (state, action: PayloadAction<boolean>) => {
      state.openProductForm = action.payload
    },
    setOpenVariantForm: (state, action: PayloadAction<boolean>) => {
      state.openVariantForm = action.payload
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload
    },
    setSelectedVariant: (state, action: PayloadAction<Variant | null>) => {
      state.selectedVariant = action.payload
      state.openVariantForm = true
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products = [action.payload, ...state?.products]
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state?.products?.filter(
        (product) => product?.id !== action.payload
      )
    },
    deleteVariant: (
      state,
      action: PayloadAction<{
        productId: string
        variantId: string
      }>
    ) => {
      state.products = state?.products?.map((product) => {
        const updatedVariants = state?.products
          ?.find((product) => product?.id === action.payload?.productId)
          ?.variants?.filter(
            (variant) => variant?.id !== action.payload?.variantId
          )
        return { ...product, variants: updatedVariants }
      })
    },
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload
    },
    addVariant: (
      state,
      action: PayloadAction<{ variant: Variant; productId: string }>
    ) => {
      state.products = state.products?.map((product) =>
        product.id === action.payload.productId
          ? {
              ...product,
              variants: [...(product?.variants ?? []), action.payload.variant],
            }
          : product
      )
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products?.map((product) =>
        product?.id === action.payload?.id ? { ...action.payload } : product
      )
    },
    editVariant: (
      state,
      action: PayloadAction<{ productId: string; variant: Variant }>
    ) => {
      state.products = state.products?.map((product) =>
        product.id === action.payload.productId
          ? {
              ...product,
              variants: product?.variants?.map((variant) =>
                variant?.id === action.payload?.variant?.id
                  ? { ...action.payload.variant }
                  : variant
              ),
            }
          : product
      )
    },
  },
})

export const actions = productSlice.actions

export default productSlice.reducer
