import { Container, Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

export default function MyNav(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='sticky'
        sx={{
          paddingX: 0,
          marginX: 0,
          background:
            'linear-gradient(98deg, rgba(52,177,161,1) 54%, rgba(220,231,117,1) 100%)',
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box display='flex' width='100vw' justifyContent='space-between'>
              <Typography
                color='white'
                variant='h6'
                component='div'
                sx={{ flexGrow: 1 }}
              >
                INVENTORY SYSTEM
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
