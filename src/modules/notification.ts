import { notifications, NotificationData } from '@mantine/notifications';

export function show(props: NotificationData = {
  message: ''
}): string {
  return notifications.show({
    withBorder: true,
    color: '#fff',
    ...props,
  })
}

export function hide(id: string) {
  notifications.hide(id);
}
