import { styled, TableCell, tableCellClasses } from '@mui/material'

export const StyledTableSubCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 18,
    borderBottom: 'none',
    paddingLeft: 40,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: 'none',
    paddingLeft: 40,
  },
}))
