import { useSearchParams } from 'react-router-dom'

import { RemoveCircle } from '@mui/icons-material'
import AssessmentIcon from '@mui/icons-material/Assessment'
import {
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { Visitor } from '@/common/interfaces/user'
import Avatar from '@/components/Avatar'
import Link from '@/components/Link'
import { useAppState } from '@/states'
import { chineseTime } from '@/utils/dayjs'
import { pages } from '@/utils/routes'
import { searchParamsAssign } from '@/utils/tools'

const VisitorAvatar = ({ user }: { user: Visitor }) => (
  <Avatar alt={user.username} uid={user.uid} size={40} variant="rounded" />
)

const Side = ({
  visitors,
  visits,
}: {
  visitors?: Visitor[]
  visits?: number
}) => {
  const { state } = useAppState()
  const [searchParams, setSearchParams] = useSearchParams()
  return (
    <Box sx={{ width: 232 }} flexGrow={0} flexShrink={0}>
      <Stack direction="row" alignItems="center" sx={{ p: 1.5 }}>
        <AssessmentIcon />
        <Typography fontWeight={600} className="ml-1">
          最近访问
        </Typography>
      </Stack>
      <Divider sx={{ bgcolor: 'rgb(27, 83, 205)' }} />
      <Paper sx={{ mt: 1, px: 0.75, py: 2 }}>
        <Grid container spacing={0.75}>
          {visitors?.map((user) => (
            <Grid item xs={4} key={user.uid}>
              <Stack
                component={Link}
                to={pages.user({ uid: user.uid })}
                underline="none"
                alignItems="center"
              >
                {user.uid == state.user.uid ? (
                  <Badge
                    badgeContent={
                      <Tooltip title="删除访问记录">
                        <IconButton
                          color="warning"
                          size="small"
                          onClick={(e) => {
                            e.preventDefault()
                            setSearchParams(
                              searchParamsAssign(searchParams, {
                                additional: 'removevlog',
                              })
                            )
                          }}
                        >
                          <RemoveCircle />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <VisitorAvatar user={user} />
                  </Badge>
                ) : (
                  <VisitorAvatar user={user} />
                )}
                <Typography
                  fontSize={12}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="100%"
                >
                  {user.username}
                </Typography>
                <Typography fontSize={12} color="rgb(161, 173, 197)">
                  {chineseTime(user.dateline * 1000, { short: true })}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
        {!!visits && (
          <Typography mt={1} color="rgba(96, 98, 102, 0.8)" px={0.5}>
            已有 {visits} 人次来访
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default Side
