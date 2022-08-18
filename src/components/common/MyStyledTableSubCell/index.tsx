import { styled, TableCell, tableCellClasses } from '@mui/material'

export const StyledTableSubCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary.main,
    fontSize: 18,
    borderBottom: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottom: 'none',
  },
}))
