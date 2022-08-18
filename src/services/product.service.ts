import { Category, Product } from '~/types/product.type'
import { Variant } from '~/types/variant.type'
import firebaseDb from '~/utils/firebase'

export const addProduct = (product: Product) => {
  return (
    firebaseDb.child('products').push(product),
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('success')
      }
    }
  )
}

export const addVariant = (productId: string, variant: Variant) => {
  console.log({ productId })
  const fb = firebaseDb.child(`products/${productId}/variants/`).push(variant)
  ;(err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  }
}
