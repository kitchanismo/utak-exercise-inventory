import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useProduct } from '~/hooks/product.hook'
import FormProductDialog from '~/components/products/FormProductDialog'

const ProductHeader = () => {
  const { onOpenProductForm, productState, onSelectedProduct } = useProduct()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 3,
        alignItems: 'center',
      }}
    >
      {productState?.openProductForm && <FormProductDialog />}
      <Box>
        <Typography variant='h5' color='primary'>
          Product Management
        </Typography>
        <Typography variant='caption'>
          View list, add, edit and delete products
        </Typography>
      </Box>

      <Button
        size='large'
        startIcon={<AddIcon />}
        variant='contained'
        color='secondary'
        onClick={() => {
          onSelectedProduct(null)
          onOpenProductForm(true)
        }}
      >
        New Product
      </Button>
    </Box>
  )
}

export default ProductHeader
