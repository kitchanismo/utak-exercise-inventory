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
import { setProduct } from '~/stores/product.slice'

export const useProduct = () => {
  // const productState = useSelector(
  //   (state: ApplicationReducers) => state?.productStore
  // )

  // const dispatch = useDispatch()

  const productState = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    onGetProducts()
    console.log({ x: productState })
  }, [productState?.selectedTab])

  const onGetProducts = () => {
    getProducts().then((products) => {
      dispatch(setProduct(products))
    })
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
