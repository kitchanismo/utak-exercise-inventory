import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import {
  addProduct,
  addVariant,
  deleteProduct,
  deleteVariant,
  editProduct,
  editVariant,
} from '~/services/product.service'
import { ApplicationReducers } from '~/stores'
import {
  setProductsAction,
  deleteProductAction,
  setSelectedVariant,
  setOpenProductForm,
  setSelectedProduct,
  setOpenVariantForm,
  setSelectedTab,
} from '~/stores/product.store'
import { Variant } from '~/types/variant.type'
import firebaseDb from '~/utils/firebase'
import { mapFirebaseDataToProduct } from '~/utils'
import { useEffect } from 'react'
import axios from 'axios'

export const useProduct = () => {
  const productState = useSelector(
    (state: ApplicationReducers) => state?.productStore
  )

  const dispatch = useDispatch()

  useEffect(() => {
    onGetProducts()
  }, [productState?.selectedTab])

  const onGetProducts = () => {
    const productsFireBase = firebaseDb.child('products')

    productsFireBase.on('value', (snapshot) => {
      const products = mapFirebaseDataToProduct(snapshot.val())

      dispatch(setProductsAction(products))
    })

    return productsFireBase
  }

  const onAddProduct = async (product: Product) => {
    await addProduct({ ...product })
  }

  const onAddVariant = async (productId: string, variant: Variant) => {
    await addVariant(productId, variant)
  }

  const onDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)
    dispatch(deleteProductAction(productId))
  }

  const onDeleteVariant = async (productId: string, variantId: string) => {
    await deleteVariant(productId, variantId)
  }

  const onOpenProductForm = (open: boolean) => {
    dispatch(setOpenProductForm(open))
  }

  const onOpenVariantForm = (open: boolean) => {
    dispatch(setOpenVariantForm(open))
  }

  const onSelectedProduct = (product: Product | null) => {
    dispatch(setSelectedProduct(product))

    //dispatch(setOpenProductForm(true))
  }

  const onEditProduct = async (product: Product) => {
    await editProduct(product)
  }

  const onEditVariant = async (productId: string, variant: Variant) => {
    await editVariant(productId, variant)
  }

  const onSelectedVariant = (variant: Variant | null) => {
    dispatch(setSelectedVariant(variant))
    dispatch(setOpenVariantForm(true))
  }

  const onSelectedTab = (tab: string) => {
    dispatch(setSelectedTab(tab))
    axios
      .post(
        'https://us-central1-posfire-8d2cb.cloudfunctions.net/deliveries-borzo-webhook',
        {
          order: {
            order_id: 11111,
          },
        }
      )
      .then((res) => console.log({ res }))
      .catch((error) =>
        console.log('error', error?.response?.data?.message || error?.message)
      )
  }

  return {
    productState,
    onGetProducts,
    onAddProduct,
    onAddVariant,
    onDeleteProduct,
    onDeleteVariant,
    onOpenProductForm,
    onSelectedProduct,
    onEditProduct,
    onOpenVariantForm,
    onSelectedVariant,
    onEditVariant,
    onSelectedTab,
  }
}
