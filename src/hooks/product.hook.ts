import { Product, ProductStore } from '~/types/product.type'
import {
  addProduct,
  addVariant,
  deleteProduct,
  deleteVariant,
  editProduct,
  editVariant,
} from '~/services/product.service'
import { Variant } from '~/types/variant.type'
import firebaseDb from '~/utils/firebase'
import { mapFirebaseDataToProduct } from '~/utils'
import { useEffect, useState } from 'react'
import createFastContext from './fast-context.hook'

export const { FastContextProvider, useFastContext } = createFastContext({
  products: [],
  openVariantForm: false,
  openProductForm: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedTab: 'All',
} as ProductStore)

export const useProduct = () => {
  const [productState, setProductStore] = useFastContext<ProductStore>(
    (store) => store
  )

  useEffect(() => {
    onGetProducts(productState?.selectedTab)
  }, [productState?.selectedTab])

  const onGetProducts = (tab: string) => {
    const productsFireBase = firebaseDb.child('products')
    productsFireBase.on('value', (snapshot) => {
      let products = mapFirebaseDataToProduct(snapshot.val())

      if (tab !== 'All') {
        products = products?.filter((product) => product?.category === tab)
      }

      setProductStore({ products })
    })

    return []
  }

  const onAddProduct = async (product: Product) => {
    await addProduct({ ...product })
  }

  const onAddVariant = async (productId: string, variant: Variant) => {
    await addVariant(productId, variant)
  }

  const onDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)

    const products = productState.products?.filter(
      (product) => product?.id !== productId
    )
    setProductStore({ products })
  }

  const onDeleteVariant = async (productId: string, variantId: string) => {
    await deleteVariant(productId, variantId)
  }

  const onOpenProductForm = (open: boolean) => {
    setProductStore({ openProductForm: open })
  }

  const onOpenVariantForm = (open: boolean) => {
    setProductStore({ openVariantForm: open })
  }

  const onSelectedProduct = (product: Product | null) => {
    setProductStore({ selectedProduct: product })
  }

  const onEditProduct = async (product: Product) => {
    await editProduct(product)
  }

  const onEditVariant = async (productId: string, variant: Variant) => {
    await editVariant(productId, variant)
  }

  const onSelectedVariant = (variant: Variant | null) => {
    setProductStore({ selectedVariant: variant, openVariantForm: true })
  }

  const onSelectedTab = (tab: string) => {
    setProductStore({ selectedTab: tab })
  }

  return {
    productState,
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
