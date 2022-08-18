import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import AddProductDialog from '../AddProductDialog'
import { useState } from 'react'

const ProductHeader = () => {
  const [open, setOpen] = useState(false)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 3,
        alignItems: 'center',
      }}
    >
      <AddProductDialog openState={[open, setOpen]} />
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
        onClick={() => setOpen(true)}
      >
        New Product
      </Button>
    </Box>
  )
}

export default ProductHeader
