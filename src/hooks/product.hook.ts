import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import { addProduct, addVariant } from '~/services/product.service'
import { ApplicationReducers } from '~/stores'
import { setProductsAction } from '~/stores/product.store'
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
    await addProduct({ ...product, variants: '' as any })
  }

  const onAddVariant = async (productId: string, variant: Variant) => {
    addVariant(productId, variant)
  }

  return {
    productState,
    onGetProducts,
    onAddProduct,
    onAddVariant,
  }
}
