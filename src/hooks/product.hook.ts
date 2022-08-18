import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import { addProduct, getProducts } from '~/services/product.service'
import { ApplicationReducers } from '~/stores'
import { toggleLoading } from '~/stores/global.store'
import {
  addProductAction,
  setProductsAction,
  addVariantAction,
} from '~/stores/product.store'
import { useEffect } from 'react'
import { Variant } from '~/types/variant.type'

export const useProduct = () => {
  const productState = useSelector(
    (state: ApplicationReducers) => state?.productStore
  )

  const dispatch = useDispatch()

  const onGetProducts = async () => {
    dispatch(toggleLoading())
    const users = await getProducts()

    dispatch(setProductsAction(users))
  }

  const onAddProduct = async (product: Product) => {
    const newProduct = await addProduct(product)
    dispatch(addProductAction(newProduct))
  }

  const onAddVariant = async (id: number, variant: Variant) => {
    dispatch(addVariantAction({ id, variant }))
  }

  return {
    productState,
    onGetProducts,
    onAddProduct,
    onAddVariant,
  }
}
