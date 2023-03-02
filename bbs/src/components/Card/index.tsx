import { Box, Divider, Typography, useTheme } from '@mui/material'

type props = {
  children: React.ReactElement
  header?: string
  tiny?: boolean
}

const CardHead = ({ header }: { header: string }) => {
  return (
    <>
      <Box className="px-2 py-4">
        <Typography>{header}</Typography>
      </Box>
      <Divider />
    </>
  )
}

const Card = ({ children, header, tiny }: props) => {
  const theme = useTheme()
  return (
    <Box
      className={`rounded-lg shadow-lg ${tiny ? 'px-2' : 'px-4'}`}
      style={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {header ? <CardHead header={header} /> : <></>}
      <Box>{children}</Box>
    </Box>
  )
}

export default Card
