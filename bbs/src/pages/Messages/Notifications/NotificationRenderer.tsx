import { Typography } from '@mui/material'

import { Notification } from '@/common/interfaces/response'
import Link from '@/components/Link'
import { pages } from '@/utils/routes'

const NotificationRenderer = ({ item }: { item: Notification }) => {
  const fontWeightStyle = item.unread ? { fontWeight: 'bold' } : undefined
  const fontWeightProp = item.unread ? { fontWeight: 'bold' } : {}
  if ((item.kind == 'reply' || item.kind == 'comment') && item.post_id) {
    return (
      <Typography {...fontWeightProp}>
        <Link to={pages.user({ uid: item.author_id })}>{item.author}</Link>{' '}
        {item.kind == 'comment' ? '点评' : '回复'}了您的帖子：
        <Link to={pages.goto(item.post_id)}>{item.subject}</Link>
      </Typography>
    )
  }
  return (
    <div
      dangerouslySetInnerHTML={{ __html: item.html_message }}
      style={fontWeightStyle}
    />
  )
}

export default NotificationRenderer