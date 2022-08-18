import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Variant } from '~/types/variant.type'
import { lettersOnly } from '~/utils'

export const useAddVariantForm = (defaultValues: Partial<Variant>) => {
  const addVariantSchema = yup.object().shape({
    name: lettersOnly('Option Name'),
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
  const formHook = useForm<Partial<Variant>>({
    mode: 'onChange',
    resolver: yupResolver(addVariantSchema) as unknown as Resolver<
      Partial<Variant>,
      object
    >,
    defaultValues,
  })
  return formHook
}
