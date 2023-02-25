import React, { useRef, useState } from 'react'

import { Box, Button, Popover, Typography, makeStyles } from '@mui/material'

import Chip from '../Chip'
import avatarBg from '../assets/avatar-bg.jpg'

type CardProps = {
  uid: number
  children: React.ReactNode
}

const UserCard = ({ uid, children }: CardProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Box
        color="inherit"
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        // disableRestoreFocus
      >
        The content of the Popover.
      </Popover>
    </>
  )
}

export default UserCard
