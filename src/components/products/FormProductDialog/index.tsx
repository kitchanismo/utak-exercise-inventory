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
import { useEffect, useLayoutEffect } from 'react'
import { useProduct } from '~/hooks/product.hook'

const FormProductDialog = () => {
  const { onAddProduct, onOpenProductForm, productState, onEditProduct } =
    useProduct()
  const product = productState?.selectedProduct

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    reset,
  } = useAddProductForm(product as Product)

  useEffect(() => {
    if (product?.id) {
      reset({})
      return
    }
  }, [product?.id])

  const handleClose = () => {
    onOpenProductForm(false)
    reset({})
  }

  const onSave = (_product: Partial<Product>) => {
    if (product?.id) {
      const updatedProduct = { ...product, ..._product }
      onEditProduct(updatedProduct as Product)
      onOpenProductForm(false)
      return
    }
    onAddProduct(_product as Product)
    onOpenProductForm(false)
  }

  return (
    <Dialog open={productState?.openProductForm} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        {product?.id ? 'Edit' : 'Add New'} Product
      </DialogTitle>
      <Box sx={{ minWidth: 550, p: 2, px: 3 }}>
        <form noValidate onSubmit={handleSubmit(onSave)}>
          <TextField
            {...register('name')}
            margin='dense'
            id='productName'
            label='Product Name'
            type='text'
            fullWidth
            defaultValue={product?.name}
            variant='outlined'
            FormHelperTextProps={{ sx: { color: 'red' } }}
            helperText={errors['name']?.message}
          />
          <Box sx={{ display: 'flex', pt: 1 }}>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id='demo-simple-select-label'>Category</InputLabel>
              <Select
                {...register('category')}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Category'
                defaultValue={product?.category}
              >
                <MenuItem value={Category.STARTERS}>
                  {Category.STARTERS}
                </MenuItem>
                <MenuItem value={Category.MAINS}>{Category.MAINS}</MenuItem>
                <MenuItem value={Category.COMBOS}>{Category.COMBOS}</MenuItem>
                <MenuItem value={Category.DESSERT}>{Category.DESSERT}</MenuItem>
                <MenuItem value={Category.SIDES}>{Category.SIDES}</MenuItem>
                <MenuItem value={Category.DRINKS}>{Category.DRINKS}</MenuItem>
              </Select>
              {errors['category'] && (
                <FormHelperText sx={{ color: 'red' }}>
                  {errors['category']?.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box p={1} />
            <TextField
              {...register('stock')}
              defaultValue={product?.stock}
              margin='dense'
              label='Stock'
              type='text'
              fullWidth
              variant='outlined'
              FormHelperTextProps={{ sx: { color: 'red' } }}
              helperText={errors['stock']?.message}
            />
          </Box>
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
                defaultValue={product?.price}
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
                defaultValue={product?.cost}
                id='outlined-adornment-cost'
                startAdornment={
                  <InputAdornment position='start'>₱</InputAdornment>
                }
                label='Cost'
              />
              {errors['cost'] && (
                <FormHelperText sx={{ color: 'red' }}>
                  {errors['cost']?.message}
                </FormHelperText>
              )}
            </FormControl>
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

export default FormProductDialog
