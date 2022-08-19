import { Box } from '@mui/system'
import { useEffect } from 'react'
import FormProductDialog from '~/components/products/FormProductDialog'
import FormVariantDialog from '~/components/products/FormVariantDialog'
import ProductHeader from '~/components/products/ProductHeader'
import ProductTable from '~/components/products/ProductTable'
import { useAddProductForm } from '~/forms/product.form'
import { useProduct } from '~/hooks/product.hook'

const ProductsPage = () => {
  const { productState, onGetProducts } = useProduct()
  useEffect(() => {
    const result = onGetProducts()
    return () => {
      result.onDisconnect()
    }
  }, [])
  return (
    <Box my='50px'>
      {productState?.openVariantForm && <FormVariantDialog />}
      {productState?.openProductForm && <FormProductDialog />}
      <ProductHeader />
      <ProductTable products={productState?.products} />
    </Box>
  )
}

export default ProductsPage
