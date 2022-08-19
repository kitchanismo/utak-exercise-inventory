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
import FormVariantDialog from '../FormVariantDialog'
import { useProduct } from '~/hooks/product.hook'
import DeleteDialog from '../DeleteProductDialog'
import { Variant } from '~/types/variant.type'
import { capitalize, toMoney } from '~/utils'
import { setSelectedProduct } from '~/stores/product.store'

interface ProductTablRowProps {
  product: Product
}

const ProductRow = ({ product }: ProductTablRowProps) => {
  const hasNoVariant = !product?.variants || product?.variants?.length === 0
  const [open, setOpen] = React.useState(!hasNoVariant)

  const [openProductDelete, setOpenProductDelete] = useState(false)
  const [openVariantDelete, setOpenVariantDelete] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<Variant>()
  const {
    onDeleteProduct,
    onDeleteVariant,
    onSelectedProduct,
    onOpenProductForm,
    onOpenVariantForm,
    onSelectedVariant,
  } = useProduct()

  useEffect(() => {
    setOpen(!hasNoVariant)
  }, [hasNoVariant])

  return (
    <React.Fragment>
      <DeleteDialog
        onDelete={() => onDeleteProduct(product?.id as string)}
        name={product?.name}
        openState={[openProductDelete, setOpenProductDelete]}
      />
      <DeleteDialog
        onDelete={async () => {
          onDeleteVariant(product?.id as string, selectedVariant?.id as string)
          setOpenVariantDelete(false)
        }}
        name={`${product?.name} (${selectedVariant?.name})`}
        openState={[openVariantDelete, setOpenVariantDelete]}
      />

      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          cursor: !hasNoVariant ? 'pointer' : undefined,
        }}
        onClick={() => (!hasNoVariant ? setOpen(!open) : null)}
      >
        <StyledTableCell>{capitalize(product?.name)}</StyledTableCell>
        <StyledTableCell align='right'>{product?.category}</StyledTableCell>
        <StyledTableCell align='right'>
          {hasNoVariant ? toMoney(product?.price) : '-'}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {hasNoVariant ? toMoney(product?.cost) : '-'}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {hasNoVariant ? product?.stock : '-'}
        </StyledTableCell>
        <StyledTableCell align='right'>
          <>
            {hasNoVariant && (
              <Tooltip title='ADD OPTION'>
                <IconButton
                  onClick={() => {
                    onOpenVariantForm(true)
                    onSelectedVariant(null)
                    onSelectedProduct(product)
                  }}
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
              <IconButton
                onClick={() => {
                  onSelectedProduct(product)
                  onOpenProductForm(true)
                }}
                aria-label='expand row'
                size='medium'
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='DELETE PRODUCT'>
              <IconButton
                onClick={() => setOpenProductDelete(true)}
                aria-label='expand row'
                size='medium'
              >
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
                  onClick={() => {
                    onOpenVariantForm(true)
                    onSelectedVariant(null)
                    onSelectedProduct(product)
                  }}
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
                    <React.Fragment key={variant?.id}>
                      <TableRow>
                        <StyledTableSubCell>
                          {capitalize(variant.name)}
                        </StyledTableSubCell>
                        <StyledTableSubCell>
                          {toMoney(variant?.price)}
                        </StyledTableSubCell>
                        <StyledTableSubCell>
                          {toMoney(variant?.cost)}
                        </StyledTableSubCell>
                        <StyledTableSubCell>
                          {variant?.stock}
                        </StyledTableSubCell>
                        <StyledTableSubCell>
                          <>
                            <Tooltip title='EDIT OPTION'>
                              <IconButton
                                onClick={() => {
                                  onSelectedVariant(variant)
                                  onSelectedProduct(product)
                                }}
                                aria-label='expand row'
                                size='medium'
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='DELETE OPTION'>
                              <IconButton
                                onClick={() => {
                                  setOpenVariantDelete(true)
                                  setSelectedVariant(variant)
                                }}
                                aria-label='expand row'
                                size='medium'
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        </StyledTableSubCell>
                      </TableRow>
                    </React.Fragment>
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
