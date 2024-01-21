import { useQuery } from '@tanstack/react-query'

import React, { useEffect, useRef, useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Toolbar,
  Typography,
} from '@mui/material'

import { getForumList } from '@/apis/common'
import { Forum } from '@/common/interfaces/response'
import Link from '@/components/Link'
import { useAppState } from '@/states'
import { pages } from '@/utils/routes'
import siteRoot from '@/utils/siteRoot'

type NavLink = {
  link: string
  name: string
  external: boolean
}

type NavData<T extends boolean> = {
  data: T extends true ? Forum : NavLink[]
  isForum: T //true时显示Forum部分
}

const listServiceItems: NavLink[] = [
  {
    link: `${siteRoot}/graduate_bind/frontend/index.html`,
    name: '学号换绑',
    external: true,
  },
  {
    link: `${siteRoot}/member.php?mod=relevance`,
    name: '实名关联',
    external: true,
  },
  {
    link: `${siteRoot}/plugin.php?id=ahome_fv:index`,
    name: '亲密认证',
    external: true,
  },
  {
    link: `${siteRoot}/home.php?mod=medal`,
    name: '勋章中心',
    external: true,
  },
  {
    link: `${siteRoot}/home.php?mod=magic`,
    name: '道具商店',
    external: true,
  },
  {
    link: `${siteRoot}/home.php?mod=spacecp&ac=credit&op=exchange`,
    name: '论坛货币兑换',
    external: true,
  },
]

const renderLink = (
  link: string,
  name: string,
  key: string | number,
  external?: boolean
) => (
  <Link
    to={link}
    key={key}
    underline="none"
    color="inherit"
    external={external ?? false}
    target={external ? '_blank' : undefined}
  >
    <ListItemButton sx={{ pl: 4 }}>
      <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
      <ListItemText>
        <Typography color="inherit" className="font-bold">
          {name}
        </Typography>
      </ListItemText>
    </ListItemButton>
  </Link>
)

const Ordinate = ({ data, isForum }: NavData<boolean>) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
        <ListItemText>
          <Typography color="inherit" className="font-bold">
            {isForum ? (data as Forum).name : '论坛服务'}
          </Typography>
        </ListItemText>
        {open ? (
          <ExpandLess fontSize="inherit" />
        ) : (
          <ExpandMore fontSize="inherit" />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {isForum
            ? (data as Forum)?.children
                ?.filter((item: any) => item.fid !== 0)
                .map((item: any) =>
                  renderLink(`/forum/${item.fid}`, item.name, item.name)
                )
            : (data as NavLink[]).map((item) =>
                renderLink(item.link, item.name, item.name, item.external)
              )}
        </List>
      </Collapse>
    </>
  )
}

const Sections = ({ forumListCache }: { forumListCache?: Forum[] }) => {
  const { state } = useAppState()
  const { data, refetch } = useQuery({
    queryKey: ['forumList'],
    queryFn: () => getForumList(),
    initialData: forumListCache,
    staleTime: Infinity,
    enabled: !forumListCache,
  })
  const previousUid = useRef(state.user.uid)
  useEffect(() => {
    if (previousUid.current != state.user.uid) {
      refetch()
      previousUid.current = state.user.uid
    }
  }, [state.user.uid])
  return (
    <List style={{ color: '#7082a7' }}>
      <Link to={pages.index()} underline="none" color="inherit">
        <ListItemButton>
          <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
          <ListItemText>
            <Typography color="inherit" className="font-bold">
              首页
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Link>
      <Ordinate data={listServiceItems} isForum={false} />
      <>
        {!data?.length ? (
          <List>
            <ListItem>
              <Skeleton className="w-full" height={32}></Skeleton>
            </ListItem>
            <ListItem>
              <Skeleton className="w-full" height={32}></Skeleton>
            </ListItem>
            <ListItem>
              <Skeleton className="w-full" height={32}></Skeleton>
            </ListItem>
          </List>
        ) : (
          data.map((item) => (
            <Ordinate key={item.name} data={item} isForum={true} />
          ))
        )}
      </>
    </List>
  )
}

const NavLinks = () => {
  const { state } = useAppState()

  return (
    <Box>
      <Toolbar />
      <Sections forumListCache={state.forumListCache} />
    </Box>
  )
}

export default NavLinks
