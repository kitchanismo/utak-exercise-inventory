import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StyledTableCell } from '~/components/common/MyStyledTableCell'
import { Product } from '~/types/product.type'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Close'
import { StyledTableSubCell } from '~/components/common/MyStyledTableSubCell'
import AddVariantDialog from '../AddVariantDialog'
import { useProduct } from '~/hooks/product.hook'

interface ProductTablRowProps {
  product: Product
}

const ProductRow = ({ product }: ProductTablRowProps) => {
  const hasNoVariant = !product?.variants || product?.variants?.length === 0
  const [open, setOpen] = React.useState(!hasNoVariant)

  useEffect(() => {
    setOpen(!hasNoVariant)
  }, [hasNoVariant])

  const [openVariant, setOpenVariant] = useState(false)

  return (
    <React.Fragment>
      <AddVariantDialog
        product={product}
        openState={[openVariant, setOpenVariant]}
      />
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
        }}
      >
        <StyledTableCell>{product?.name}</StyledTableCell>
        <StyledTableCell align='right'>{product?.category}</StyledTableCell>
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
          <>
            {hasNoVariant && (
              <Tooltip title='ADD OPTION'>
                <IconButton
                  onClick={() => setOpenVariant(true)}
                  aria-label='expand row'
                  size='large'
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
            {!hasNoVariant && (
              <IconButton
                aria-label='expand row'
                size='large'
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
            <Tooltip title='EDIT PRODUCT'>
              <IconButton aria-label='expand row' size='medium'>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='DELETE PRODUCT'>
              <IconButton aria-label='expand row' size='medium'>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        </StyledTableCell>
      </TableRow>
      <TableRow
        sx={{
          bgcolor: '#eeeeee',
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
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  size='medium'
                  startIcon={<AddIcon />}
                  variant='contained'
                  color='secondary'
                  onClick={() => setOpenVariant(true)}
                >
                  New Option
                </Button>
              </Box>

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
                  {(product?.variants || [])?.map((variant) => (
                    <TableRow key={variant?.id}>
                      <StyledTableSubCell>{variant.name}</StyledTableSubCell>
                      <StyledTableSubCell>{variant?.price}</StyledTableSubCell>
                      <StyledTableSubCell>{variant?.cost}</StyledTableSubCell>
                      <StyledTableSubCell>{variant?.stock}</StyledTableSubCell>
                      <StyledTableSubCell>
                        <>
                          <Tooltip title='EDIT OPTION'>
                            <IconButton aria-label='expand row' size='medium'>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='DELETE OPTION'>
                            <IconButton aria-label='expand row' size='medium'>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      </StyledTableSubCell>
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

export default ProductRow
