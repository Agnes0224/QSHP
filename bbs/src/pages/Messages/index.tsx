import { Outlet } from 'react-router-dom'

import { List, ListItemButton, Paper, Stack } from '@mui/material'

import Link from '@/components/Link'
import { pages, useActiveRoute } from '@/utils/routes'

const navItems = [
  {
    id: 'pm',
    text: '站内信',
  },
  {
    id: 'posts',
    text: '我的帖子',
  },
  {
    id: 'system',
    text: '系统消息',
  },
]

const Messages = () => {
  const route = useActiveRoute()
  return (
    <Stack direction="row" mt={2}>
      <Paper sx={{ width: 180, mr: 4 }}>
        <List disablePadding>
          {navItems.map((item, index) => (
            <Link
              underline="none"
              color="inherit"
              key={index}
              to={pages.messages(item.id)}
            >
              <ListItemButton selected={item.id == route?.id}>
                {item.text}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Paper>
      <Outlet />
    </Stack>
  )
}

export default Messages
