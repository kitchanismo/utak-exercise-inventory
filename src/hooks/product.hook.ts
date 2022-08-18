import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import { addProduct, addVariant } from '~/services/product.service'
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

  const onGetProducts = () => {
    const productsFireBase = firebaseDb.child('products')

    productsFireBase.on('value', (snapshot) => {
      const data = snapshot.val()
      const ids = Object.keys(data)
      console.log({ data })
      let products = Object.values(data) as Product[]
      products = products
        ?.map((product, i) => ({ ...product, id: ids[i] }))
        .map((product) => {
          const vIds = Object.keys(product.variants as [])
          console.log({ vIds })

          let variants = Object.values(product.variants as []) as Variant[]
          variants = variants?.map((variant, i) => ({
            ...variant,
            id: vIds[i],
          }))
          return {
            ...product,
            variants,
          }
        })

      console.log({ products })
      dispatch(setProductsAction(products))
    })

    return productsFireBase
  }

  const onAddProduct = async (product: Product) => {
    await addProduct({ ...product, variants: '' as any })
  }

  const onAddVariant = async (productId: string, variant: Variant) => {
    addVariant(productId, variant)
    //dispatch(addVariantAction({ id, variant }))
  }

  const onDeleteVariant = async (productId: string, variantId: string) => {
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
