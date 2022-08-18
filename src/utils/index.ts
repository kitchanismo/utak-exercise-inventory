import * as yup from 'yup'

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
