import { Outlet } from 'react-router-dom'

import { KeyboardArrowUp } from '@mui/icons-material'
import {
  Alert,
  Box,
  Fab,
  Slide,
  Snackbar,
  Toolbar,
  useMediaQuery,
} from '@mui/material'

import Announcement from '@/components/Announcement'
import Drawer from '@/components/Drawer'
import Header from '@/components/Header'
import ScrollTop from '@/components/ScrollTop'
import TopBar from '@/components/TopBar'
import { useAppState } from '@/states'

const Layout = () => {
  const { state, dispatch } = useAppState()
  // 1720 comes from the content width 1280 plus 2 * drawer width 210
  const matches = useMediaQuery('(min-width: 1720px)')
  const drawerWidth = 210

  return (
    <>
      <Box
        className="relative flex h-full"
        // style={{ backgroundColor: '#f7f9fe' }}
      >
        <TopBar />
        <Drawer width={drawerWidth} />
        <Box
          component="main"
          className={`flex w-full flex-col items-center align-middle transition-all`}
          sx={{
            marginLeft: {
              sm: `${state.drawer && !matches ? drawerWidth : 0}px`,
            },
          }}
        >
          <Toolbar id="back-to-top-anchor" />
          <Box id="detail" className="h-full w-full max-w-screen-xl flex-1 p-4">
            <Announcement />
            <Header />
            <Outlet />
          </Box>
        </Box>
        <ScrollTop>
          <Fab size="small" aria-label="回到顶部">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
        {state.globalSnackbar && (
          <Snackbar
            key={state.globalSnackbar.key}
            open
            TransitionComponent={Slide}
            autoHideDuration={3000}
            onClose={() => dispatch({ type: 'close snackbar' })}
            sx={{
              '&.MuiSnackbar-root': {
                left: '50%',
                top: '50%',
                right: 'auto',
                bottom: 'auto',
                transform: 'translate(-50%, -50%)',
              },
            }}
          >
            <Alert
              severity={state.globalSnackbar.severity ?? 'info'}
              variant="filled"
            >
              {state.globalSnackbar.message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  )
}

export default Layout
