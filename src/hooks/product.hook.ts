import { useDispatch, useSelector } from 'react-redux'
import { Product } from '~/types/product.type'
import {
  addProduct,
  getProducts,
  getCategories,
} from '~/services/product.service'
import { ApplicationReducers } from '~/stores'
import { toggleLoading } from '~/stores/global.store'
import {
  addProductAction,
  setCategoriesAction,
  setProductsAction,
} from '~/stores/product.store'

export const useProduct = () => {
  const productState = useSelector(
    (state: ApplicationReducers) => state?.productStore
  )

  const dispatch = useDispatch()

  const onGetProducts = async () => {
    dispatch(toggleLoading())
    const users = await getProducts()

    dispatch(setProductsAction(users))
  }

  const onAddProduct = async (product: Product) => {
    const newProduct = await addProduct(product)
    dispatch(addProductAction(newProduct))
  }

  const onGetCategories = async () => {
    const categories = await getCategories()
    dispatch(setCategoriesAction(categories))
  }

  return {
    productState,
    onGetProducts,
    onAddProduct,
    onGetCategories,
  }
}
