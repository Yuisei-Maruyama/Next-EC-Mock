import React from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import NotificationsIcon from '@mui/icons-material/Notifications'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EC Site
        </Typography>
        <IconButton color="inherit">
          <FavoriteIcon />
        </IconButton>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
