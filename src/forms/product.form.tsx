import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Product } from '~/types/product.type'
import { lettersOnly } from '~/utils'

export const useAddProductForm = (defaultValues: Partial<Product>) => {
  const addProductSchema = yup.object().shape({
    name: yup.string().required().label('Product Name'),
    category: yup.string().required().label('Category'),
    price: yup
      .number()
      .required()
      .typeError('Must only contain a numbers')
      .label('Price'),
    cost: yup
      .number()
      .required()
      .typeError('Must only contain a numbers')
      .label('Cost'),
    stock: yup
      .number()
      .required()
      .typeError('Must only contain a numbers')
      .label('Stock'),
  })
  const formHook = useForm<Partial<Product>>({
    mode: 'onChange',
    resolver: yupResolver(addProductSchema) as unknown as Resolver<
      Partial<Product>,
      object
    >,
    defaultValues,
  })
  return formHook
}
