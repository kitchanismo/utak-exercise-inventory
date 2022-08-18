import { Route, Routes as BrowserRoutes } from 'react-router-dom'
import CategoriesPage from '~/pages/categories'
import NotFoundPage from '~/pages/not-found'
import ProductsPage from '~/pages/products'

const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path='/' element={<ProductsPage />} />
      <Route path='/categories' element={<CategoriesPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </BrowserRoutes>
  )
}

export default Routes
