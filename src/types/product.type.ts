import { Variant } from './variant.type'

export enum Category {
  STARTERS = 'Starters',
  MAINS = 'Mains',
  COMBOS = 'Combos',
  DESSERT = 'Desserts',
  SIDES = 'Sides',
  DRINKS = 'Drinks',
}

export type Product = {
  id?: string
  name: string
  category: Category
  price: number
  cost: number
  stock: number
  variants?: Variant[] | null
}
