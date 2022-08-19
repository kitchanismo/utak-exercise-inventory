import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import SaveIcon from '@mui/icons-material/Save'
import { Box, minWidth } from '@mui/system'
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'
import { Category, Product } from '~/types/product.type'
import { useAddProductForm } from '~/forms/product.form'
import { useEffect } from 'react'
import { useProduct } from '~/hooks/product.hook'
import { useAddVariantForm } from '~/forms/variant.from'
import { Variant } from '~/types/variant.type'

// interface AddVariantDialogProps {
//   product: Product
// }

const FormVariantDialog = () => {
  const { onAddVariant, productState, onOpenVariantForm, onEditVariant } =
    useProduct()

  const variant = productState?.selectedVariant
  const product = productState?.selectedProduct

  console.log({ product, variant })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useAddVariantForm({})

  // useEffect(() => {
  //   reset({})
  // }, [productState?.openVariantForm])

  useEffect(() => {
    if (variant?.id) {
      reset({})
      return
    }
  }, [variant?.id])

  const handleClose = () => {
    onOpenVariantForm(false)
  }

  const onSave = (newVariant: Partial<Variant>) => {
    if (variant?.id) {
      const { name, cost, price, stock } = newVariant
      onEditVariant(
        product?.id as string,
        { id: variant?.id, name, cost, price, stock } as Variant
      )
      onOpenVariantForm(false)
      return
    }
    onAddVariant(product?.id as string, newVariant as Variant)
    onOpenVariantForm(false)
  }

  return (
    <Dialog open={productState?.openVariantForm} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        Add New Option - {product?.name}
      </DialogTitle>
      <Box sx={{ minWidth: 550, p: 2, px: 3 }}>
        <form noValidate onSubmit={handleSubmit(onSave)}>
          <TextField
            {...register('name')}
            margin='dense'
            id='optionName'
            label='Option Name'
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={variant?.name}
            FormHelperTextProps={{ sx: { color: 'red' } }}
            helperText={errors['name']?.message}
          />

          <Box sx={{ display: 'flex', pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='outlined-adornment-price'>Price</InputLabel>
              <OutlinedInput
                {...register('price')}
                id='outlined-adornment-price'
                startAdornment={
                  <InputAdornment position='start'>₱</InputAdornment>
                }
                label='Price'
                defaultValue={variant?.price}
              />
              {errors['price'] && (
                <FormHelperText sx={{ color: 'red' }}>
                  {errors['price']?.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box p={1} />
            <FormControl fullWidth>
              <InputLabel htmlFor='outlined-adornment-cost'>Cost</InputLabel>
              <OutlinedInput
                {...register('cost')}
                id='outlined-adornment-cost'
                startAdornment={
                  <InputAdornment position='start'>₱</InputAdornment>
                }
                defaultValue={variant?.cost}
                label='Cost'
              />
              {errors['cost'] && (
                <FormHelperText sx={{ color: 'red' }}>
                  {errors['cost']?.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box p={1} />
            <TextField
              {...register('stock')}
              margin='dense'
              label='Stock'
              type='text'
              fullWidth
              variant='outlined'
              defaultValue={variant?.stock}
              FormHelperTextProps={{ sx: { color: 'red' } }}
              helperText={errors['stock']?.message}
              sx={{ mt: 0 }}
            />
          </Box>

          <DialogActions sx={{ pt: 3 }}>
            <Button sx={{ color: '#555' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              startIcon={<SaveIcon />}
              disabled={!isValid}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  )
}

export default FormVariantDialog
