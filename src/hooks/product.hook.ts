import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import { addProduct, getProducts } from '~/services/product.service'
import { ApplicationReducers } from '~/stores'
import { toggleLoading } from '~/stores/global.store'
import {
  addProductAction,
  setProductsAction,
  addVariantAction,
  deleteVariantAction,
} from '~/stores/product.store'
import { useEffect } from 'react'
import { Variant } from '~/types/variant.type'
import firebaseDb from '~/utils/firebase'

export const useProduct = () => {
  const productState = useSelector(
    (state: ApplicationReducers) => state?.productStore
  )

  const dispatch = useDispatch()

  const onGetProducts = async () => {
    return firebaseDb.child('products').on('value', (snapshot) => {
      dispatch(setProductsAction(snapshot.val() as Product[]))
    })
  }

  const onAddProduct = async (product: Product) => {
    const newProduct = await addProduct(product)
    dispatch(addProductAction(newProduct))
  }

  const onAddVariant = async (id: number, variant: Variant) => {
    dispatch(addVariantAction({ id, variant }))
  }

  const onDeleteVariant = async (productId: number, variantId: number) => {
    dispatch(deleteVariantAction({ productId, variantId }))
  }

  return {
    productState,
    onGetProducts,
    onAddProduct,
    onAddVariant,
    onDeleteVariant,
  }
}
