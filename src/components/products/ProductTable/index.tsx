import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Collapse, IconButton, Typography } from '@mui/material'
import { Product } from '~/types/product.type'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    paddingTop: 25,
    paddingBottom: 25,
  },
}))

const StyledTableSubCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary.main,
    fontSize: 20,

    borderBottom: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,

    borderBottom: 'none',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein }
}

interface ProductTableProps {
  products: Product[]
}

interface ProductTablRowProps {
  product: Product
}

function Row({ product }: ProductTablRowProps) {
  const [open, setOpen] = React.useState(false)
  const hasNoVariant = product?.variants?.length === 0
  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          // bgcolor: '#ededed',
        }}
      >
        <StyledTableCell>{product?.name}</StyledTableCell>
        <StyledTableCell align='right'>
          {product?.category?.name}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {hasNoVariant ? product?.price : '-'}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {hasNoVariant ? product?.cost : '-'}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {hasNoVariant ? product?.stock : '-'}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {!hasNoVariant && (
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </StyledTableCell>
      </TableRow>
      <TableRow
        sx={{
          bgcolor: '#ededed',
        }}
      >
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box
              sx={{
                pt: 2,
              }}
            >
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <StyledTableSubCell>Options</StyledTableSubCell>
                    <StyledTableSubCell>Price</StyledTableSubCell>
                    <StyledTableSubCell>Cost</StyledTableSubCell>
                    <StyledTableSubCell>Stock</StyledTableSubCell>
                    <StyledTableSubCell>Actions</StyledTableSubCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product?.variants?.map((variant) => (
                    <TableRow key={variant?.id}>
                      <StyledTableSubCell>{variant.name}</StyledTableSubCell>
                      <StyledTableSubCell>{variant?.price}</StyledTableSubCell>
                      <StyledTableSubCell>{variant?.cost}</StyledTableSubCell>
                      <StyledTableSubCell>{variant?.stock}</StyledTableSubCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  )
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align='right'>Category</StyledTableCell>
            <StyledTableCell align='right'>Price</StyledTableCell>
            <StyledTableCell align='right'>Cost</StyledTableCell>
            <StyledTableCell align='right'>Stock</StyledTableCell>
            <StyledTableCell align='right'>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <Row key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
