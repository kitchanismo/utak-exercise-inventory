import { Category, Product } from '~/types/product.type'
import { Variant } from '~/types/variant.type'
import { mapFirebaseDataToProduct } from '~/utils'
import firebaseDb from '~/utils/firebase'

export const getProducts = async () => {
  const productsFireBase = firebaseDb.child('products')

  const products = await productsFireBase.once('value').then((data) => {
    return mapFirebaseDataToProduct(data.val())
  })

  return products
}

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
  firebaseDb.child(`products/${productId}/variants/`).push(variant)
  ;(err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  }
}

export const editProduct = (product: Product) => {
  firebaseDb.child(`products/${product?.id}/`).set(product)
  ;(err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  }
}

export const editVariant = (productId: string, variant: Variant) => {
  firebaseDb.child(`products/${productId}/variants/${variant?.id}`).set(variant)
  ;(err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  }
}

export const deleteProduct = (productId: string) => {
  firebaseDb.child(`products/${productId}`).remove((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('success')
    }
  })
}

export const deleteVariant = (productId: string, variantId: string) => {
  firebaseDb
    .child(`products/${productId}/variants/${variantId}`)
    .remove((err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('success')
      }
    })
}
