import { Route, Routes as BrowserRoutes } from 'react-router-dom'
import ProductsPage from '~/pages/products'

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path='/' element={<ProductsPage />} />
    </BrowserRoutes>
  )
}

export default Routes
