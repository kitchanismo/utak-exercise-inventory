import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import {
  addProduct,
  addVariant,
  deleteProduct,
  deleteVariant,
  editProduct,
} from '~/services/product.service'
import { ApplicationReducers } from '~/stores'
import {
  setProductsAction,
  deleteProductAction,
  deleteVariantAction,
  setOpenProductForm,
  setSelectedProduct,
} from '~/stores/product.store'
import { Variant } from '~/types/variant.type'
import firebaseDb from '~/utils/firebase'
import { mapFirebaseDataToProduct } from '~/utils'

export const useProduct = () => {
  const productState = useSelector(
    (state: ApplicationReducers) => state?.productStore
  )

  const dispatch = useDispatch()

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
    //dispatch(deleteVariantAction({ productId, variantId }))
  }

  const onOpenProductForm = (open: boolean) => {
    dispatch(setOpenProductForm(open))
  }

  const onSelectedProduct = (product: Product | null) => {
    dispatch(setSelectedProduct(product))
    dispatch(setOpenProductForm(true))
  }

  const onEditProduct = async (product: Product) => {
    await editProduct(product)
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
  }
}
