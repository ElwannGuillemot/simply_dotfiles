import {
  createTree
} from '../fns.js'

const Notifications = await Service.import('notifications')

export default {
  type: 'custom',
  child: Widget.Box({
    vertical: true
  }).hook(Notifications, (self) => {
    const notifications = Notifications.notifications.reduce((acc, notif) => {
      const { app_name } = notif

      if (!acc[app_name]) {
        acc[app_name] = {
          type: 'dir',
          children: {}
        }
      }

      acc[app_name].children[notif.id] = {
        type: 'custom',
        child: Widget.Label({
          label: app_name === 'Spotify' ? `󰝚 Playing - ${notif.summary}` : notif.summary,
          maxWidthChars: 24,
          truncate: 'end'
        })
      }

      return acc
    }, {})

    self.children = createTree({
      notifications: {
        type: 'dir',
        children: notifications
      }
    })
  }, 'changed')
}
