import { Provider } from 'react-redux'
import { store } from '~/stores'
import Routes from '~/routes'
import MyNav from '~/components/common/MyNav'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container } from '@mui/system'
import { Outlet } from 'react-router-dom'

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
      <Provider store={store}>
        <MyNav />
        <Container maxWidth='xl'>
          <Routes />
        </Container>
      </Provider>
    </ThemeProvider>
  )
}

export default App
