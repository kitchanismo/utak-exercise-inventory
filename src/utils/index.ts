import * as yup from 'yup'
import { Product } from '~/types/product.type'
import { Variant } from '~/types/variant.type'

export const capitalize = (str, lower = false) =>
  (lower ? str?.toLowerCase() : str)
    ?.toLowerCase()
    ?.replace(/(?:^|\s|["'([{])+\S/g, (match) => match?.toUpperCase())

export const lettersOnly = (label: string) => {
  return yup
    .string()
    .label(label)
    .required()
    .matches(
      /^[A-Za-z\s.ñÑ]*$/,
      `${label} must not have a number or special character`
    )
}

export const alphaNumeric = (label: string) => {
  return yup
    .string()
    .label(label)
    .required()
    .matches(/^[a-z0-9]+$/i, `${label} must not have a special character`)
}

export const toMoney = (amount: any) => {
  return amount
    ? '₱ ' + Number(Number(amount)?.toFixed(0))?.toLocaleString()
    : ''
}

export const mapFirebaseDataToProduct = (data) => {
  const ids = Object.keys(data)

  let products = Object.values(data) as Product[]
  products = products
    ?.map((product, i) => ({ ...product, id: ids[i] }))
    .map((product) => {
      const vIds = product?.variants ? Object.keys(product?.variants as []) : []
      let variants = product?.variants
        ? (Object.values(product?.variants as []) as Variant[])
        : []
      variants = variants?.map((variant, i) => ({
        ...variant,
        id: vIds[i],
      }))
      return {
        ...product,
        variants,
      }
    })

  return products
}
