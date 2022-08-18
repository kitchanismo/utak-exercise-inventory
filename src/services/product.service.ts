import { Category } from '~/types/category.type'
import { Product } from '~/types/product.type'

export const getProducts = () => {
  return Promise.resolve([
    {
      id: 1,
      name: 'Piatos',
      category: { name: 'Snack' },
      price: 15,
      cost: 12,
      stock: 10,
      variants: [
        { name: 'Small', price: 15, cost: 12, stock: 10 },
        { name: 'Medium', price: 20, cost: 18, stock: 5 },
      ],
    },
    {
      id: 2,
      name: 'Nova',
      category: { name: 'Snack' },
      price: 20,
      cost: 12,
      stock: 10,
      variants: [],
    },
  ] as Product[])
}

export const addProduct = (product: Product) => {
  return Promise.resolve(product)
}

export const getCategories = () => {
  return Promise.resolve([
    {
      id: 1,
      name: 'Snack',
    },
  ] as Category[])
}
