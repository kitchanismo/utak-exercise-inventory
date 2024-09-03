import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import {
  addProduct,
  addVariant,
  deleteProduct,
  deleteVariant,
  editProduct,
  editVariant,
  getProducts,
} from '~/services/product.service'
// import { ApplicationReducers } from '~/stores'
import {
  setProductsAction,
  deleteProductAction,
  setSelectedVariant,
  setOpenProductForm,
  setSelectedProduct,
  setOpenVariantForm,
  setSelectedTab,
  IProductState,
} from '~/stores/product.store'
import { Variant } from '~/types/variant.type'
import firebaseDb from '~/utils/firebase'
import { mapFirebaseDataToProduct } from '~/utils'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '~/stores'
import { actions } from '~/stores/product.slice'

export const useProduct = () => {
  // const productState = useSelector(
  //   (state: ApplicationReducers) => state?.productStore
  // )

  // const dispatch = useDispatch()

  const productState = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    onGetProducts()
  }, [productState?.selectedTab])

  const onGetProducts = () => {
    getProducts().then((products) => {
      dispatch(actions.setProduct(products))
    })
  }

  const onAddProduct = async (product: Product) => {
    await addProduct({ ...product })
    dispatch(actions.addProduct(product))
  }

  const onAddVariant = async (productId: string, variant: Variant) => {
    await addVariant(productId, variant)
    dispatch(actions.addVariant({ variant, productId }))
  }

  const onDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)
    dispatch(actions.deleteProduct(productId))
  }

  const onDeleteVariant = async (productId: string, variantId: string) => {
    await deleteVariant(productId, variantId)
    dispatch(actions.deleteVariant({ productId, variantId }))
  }

  const onOpenProductForm = (open: boolean) => {
    dispatch(actions.setOpenProductForm(open))
  }

  const onOpenVariantForm = (open: boolean) => {
    dispatch(actions.setOpenVariantForm(open))
  }

  const onSelectedProduct = (product: Product | null) => {
    dispatch(actions.setSelectedProduct(product))
  }

  const onEditProduct = async (product: Product) => {
    await editProduct(product)
    dispatch(actions.editProduct(product))
  }

  const onEditVariant = async (productId: string, variant: Variant) => {
    await editVariant(productId, variant)
    dispatch(actions.editVariant({ productId, variant }))
  }

  const onSelectedVariant = (variant: Variant | null) => {
    dispatch(actions.setSelectedVariant(variant))
  }

  const onSelectedTab = (tab: string) => {
    dispatch(actions.setSelectedTab(tab))
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
