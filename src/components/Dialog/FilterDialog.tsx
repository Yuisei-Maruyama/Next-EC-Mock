import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Typography,
  Box,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  freeShippingOnly: boolean
  open: boolean
  selected: string
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSelectChange: (event: any) => void
}

const FilterDialog: React.FC<Props> = ({
  open,
  freeShippingOnly,
  selected,
  setOpen,
  handleCheckboxChange,
  handleSelectChange,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleFilterApply = (e) => {
    handleCheckboxChange(e)
    handleClose()
  }

  const selectMenu = [
    { value: 'recommend', label: 'おすすめ順' },
    { value: 'priceAsc', label: '価格の安い順' },
    { value: 'priceDesc', label: '価格の高い順' },
  ]

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>フィルター</Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">表示順</Typography>
        <Select
          value={selected}
          onChange={handleSelectChange}
          fullWidth
          sx={{ marginTop: '10px' }}
        >
          {selectMenu.map((menu) => (
            <MenuItem key={menu.value} value={menu.value}>
              {menu.label}
            </MenuItem>
          ))}
        </Select>
        <Divider sx={{ marginTop: '20px' }} />
        <FormControlLabel
          sx={{ marginTop: '20px' }}
          control={
            <Checkbox
              checked={freeShippingOnly}
              onChange={handleCheckboxChange}
            />
          }
          label="送料無料"
        />
        <Divider sx={{ marginTop: '20px' }} />
        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          価格
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="1000"
            sx={{ width: '100px' }}
          />
          <Typography variant="subtitle2" sx={{ marginLeft: '10px' }}>
            円以上
          </Typography>

          <Typography variant="subtitle2" sx={{ marginX: '20px' }}>
            〜
          </Typography>

          <TextField
            variant="outlined"
            placeholder="2000"
            sx={{ width: '100px' }}
          />
          <Typography variant="subtitle2" sx={{ marginLeft: '10px' }}>
            円以下
          </Typography>
        </Box>
        <Divider sx={{ marginTop: '20px' }} />
        <Typography variant="h6" sx={{ marginTop: '20px' }}>
          カテゴリー
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <FormControlLabel control={<Checkbox />} label="カテゴリー1" />
          <FormControlLabel control={<Checkbox />} label="カテゴリー2" />
          <FormControlLabel control={<Checkbox />} label="カテゴリー3" />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleFilterApply}
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            width: '250px',
            ':hover': { backgroundColor: '#000', opacity: 0.5 },
          }}
        >
          フィルターを保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FilterDialog
