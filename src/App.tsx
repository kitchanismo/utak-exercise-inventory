import Routes from '~/routes'
import MyNav from '~/components/common/MyNav'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container } from '@mui/system'
import { Outlet } from 'react-router-dom'
import createFastContext from './hooks/fast-context.hook'
import { IProductStore } from './hooks/product.hook'

const theme = createTheme({
  palette: {
    primary: {
      main: '#31ad9d',
    },
    secondary: {
      main: '#dce775',
    },
  },
})

export const { FastContextProvider, useFastContext } = createFastContext({
  products: [],
  openVariantForm: false,
  openProductForm: false,
  selectedProduct: null,
  selectedVariant: null,
  selectedTab: 'All',
} as IProductStore)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FastContextProvider>
        <MyNav />
        <Container maxWidth='xl'>
          <Routes />
        </Container>
      </FastContextProvider>
    </ThemeProvider>
  )
}

export default App
