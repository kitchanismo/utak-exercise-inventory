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

interface AddProductDialogProps {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const AddProductDialog = ({ openState }: AddProductDialogProps) => {
  const [open, setOpen] = openState
  const { onAddProduct } = useProduct()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useAddProductForm({})

  useEffect(() => {
    reset({})
  }, [open])

  const handleClose = () => {
    setOpen(false)
  }

  const onSave = (product: Partial<Product>) => {
    onAddProduct(product as Product)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        Add New Product
      </DialogTitle>
      <Box sx={{ minWidth: 500, p: 2, px: 3 }}>
        <form noValidate onSubmit={handleSubmit(onSave)}>
          <TextField
            {...register('name')}
            margin='dense'
            id='productName'
            label='Product Name'
            type='text'
            fullWidth
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
              >
                <MenuItem value={Category.DESSERT}>{Category.DESSERT}</MenuItem>
                <MenuItem value={Category.DRINKS}>{Category.DRINKS}</MenuItem>
                <MenuItem value={Category.MEAL}>{Category.MEAL}</MenuItem>
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
              margin='dense'
              label='Stock'
              type='text'
              fullWidth
              variant='outlined'
              FormHelperTextProps={{ sx: { color: 'red' } }}
              helperText={errors['stock']?.message}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel htmlFor='outlined-adornment-price'>Price</InputLabel>
              <OutlinedInput
                {...register('price')}
                id='outlined-adornment-price'
                startAdornment={
                  <InputAdornment position='start'>₱</InputAdornment>
                }
                label='Price'
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
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  )
}

export default AddProductDialog
