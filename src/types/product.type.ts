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

export type ProductStore = {
  products: Product[]
  openProductForm: boolean
  openVariantForm: boolean
  selectedProduct: Product | null
  selectedVariant: Variant | null
  selectedTab: string
}
