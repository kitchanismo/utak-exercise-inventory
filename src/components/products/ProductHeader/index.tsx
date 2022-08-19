import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import { useProduct } from '~/hooks/product.hook'

const ProductHeader = () => {
  const { onOpenProductForm, onSelectedProduct } = useProduct()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 3,
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant='h5' sx={{ color: 'white' }}>
          Product Management
        </Typography>
        <Typography variant='subtitle1' sx={{ color: '#eeeeee' }}>
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
