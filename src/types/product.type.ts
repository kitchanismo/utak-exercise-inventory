import { Variant } from './variant.type'

export enum Category {
  DESSERT = 'Dessert',
  MEAL = 'Meal',
  DRINKS = 'Drinks',
}

export type Product = {
  id?: number
  name: string
  category: Category
  price: number
  cost: number
  stock: number
  variants?: Variant[]
}
