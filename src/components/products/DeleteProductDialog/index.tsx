import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import SaveIcon from '@mui/icons-material/Save'
import { Box } from '@mui/system'
import { Product } from '~/types/product.type'
import { capitalize } from '~/utils'

interface DeleteDialogProps {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  name: string
  onDelete: () => Promise<void>
}

const DeleteDialog = ({ openState, name, onDelete }: DeleteDialogProps) => {
  const [open, setOpen] = openState

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: '#e81e62', color: 'white' }}>
        Confirm Deletion
      </DialogTitle>
      <DialogTitle>
        Are you sure you want to delete {capitalize(name)}?
      </DialogTitle>
      <Box sx={{ minWidth: 550, p: 2, px: 3 }}>
        <DialogActions sx={{ pt: 3 }}>
          <Button sx={{ color: '#555' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            startIcon={<SaveIcon />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DeleteDialog
