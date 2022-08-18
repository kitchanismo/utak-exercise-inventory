import { Category } from './category.type'
import { Variant } from './variant.type'

export type Product = {
  id: number
  name: string
  category: Category
  price: number
  cost: number
  stock: number
  variants?: Variant[]
}
