import { Button, Pagination, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import ProductHeader from '~/components/products/ProductHeader'
import ProductTable from '~/components/products/ProductTable'
import { useProduct } from '~/hooks/product.hook'
import { Product } from '~/types/product.type'

const ProductsPage = () => {
  const { productState, onGetProducts, onGetCategories } = useProduct()
  useEffect(() => {
    onGetProducts()
    onGetCategories()
  }, [])
  return (
    <Box my='50px'>
      <ProductHeader />
      <ProductTable products={productState?.products} />
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
        count={10}
        variant='outlined'
        color='primary'
        size='large'
      />
    </Box>
  )
}

export default ProductsPage
