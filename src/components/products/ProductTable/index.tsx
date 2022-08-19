import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Collapse,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material'
import { Category, Product } from '~/types/product.type'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Close'
import { StyledTableCell } from '~/components/common/MyStyledTableCell'
import ProductRow from '../ProductRow'
import { useProduct } from '~/hooks/product.hook'

interface ProductTableProps {
  products: Product[]
}

const ProductTable = ({ products }: ProductTableProps) => {
  const { onSelectedTab, productState } = useProduct()

  const categories = ['All', ...Object.values(Category)]

  const renderCategoryTabs = () => {
    return categories?.map((category) => {
      const isActive = category === productState?.selectedTab

      return (
        <Badge
          about=''
          badgeContent={isActive ? productState?.products?.length : null}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: 'white',
            },
          }}
        >
          <Button
            onClick={() => {
              onSelectedTab(category)
            }}
            variant={isActive ? 'contained' : 'outlined'}
            sx={{
              bgcolor: isActive ? 'secondary.main' : undefined,
              ml: 2,
              '&:hover': {
                bgcolor: isActive ? 'white' : undefined,
              },
              color: isActive ? undefined : 'white',
            }}
          >
            {category}
          </Button>
        </Badge>
      )
    })
  }

  return (
    <TableContainer className='table-shadow'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: 70,
          width: 'auto',
          background:
            'linear-gradient(270deg, rgba(52,177,161,1) 50%, rgba(220,231,117,1) 100%)',
          pr: 3,
        }}
      >
        {renderCategoryTabs()}
      </Box>
      <Table sx={{ minWidth: 700 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align='left'>Category</StyledTableCell>
            <StyledTableCell align='right'>Price</StyledTableCell>
            <StyledTableCell align='right'>Cost</StyledTableCell>
            <StyledTableCell align='right'>Stock</StyledTableCell>
            <StyledTableCell sx={{ pl: 10, width: 150 }} align='center'>
              Actions
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
      {productState?.products?.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 100,
          }}
        >
          <Typography variant='h6'>No products found</Typography>
        </Box>
      )}
    </TableContainer>
  )
}

export default ProductTable
