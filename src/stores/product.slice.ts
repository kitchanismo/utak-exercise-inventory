import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IProductState } from './product.store'
import { Product } from '~/types/product.type'

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
    // increment: (state) => {
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
    setProduct: (state, action: PayloadAction<Product[]>) => {
      console.log({ products: action.payload })
      state.products = action.payload?.filter((product) => {
        if (state?.selectedTab === 'All') return true

        return product?.category === state?.selectedTab
      })
    },
  },
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer
