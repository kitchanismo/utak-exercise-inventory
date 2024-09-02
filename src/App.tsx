import Routes from '~/routes'
import MyNav from '~/components/common/MyNav'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container } from '@mui/system'
import { Outlet } from 'react-router-dom'
import { FastContextProvider } from './hooks/product.hook'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MyNav />
      <Container maxWidth='xl'>
        <FastContextProvider>
          <Routes />\
        </FastContextProvider>
      </Container>
    </ThemeProvider>
  )
}

export default App
