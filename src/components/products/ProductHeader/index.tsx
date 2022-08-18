import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'

const ProductHeader = () => {
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
        <Typography variant='h6' color='primary'>
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
      >
        New Product
      </Button>
    </Box>
  )
}

export default ProductHeader
