import { Category, Product } from '~/types/product.type'

export const getProducts = () => {
  return Promise.resolve([
    {
      id: 1,
      name: 'Piatos',
      category: Category.DESSERT,
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
      category: Category.DESSERT,
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
