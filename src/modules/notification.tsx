import { FaCheck } from 'react-icons/fa6';
import { notifications, NotificationData } from '@mantine/notifications';

export function show(props: NotificationData): string {
  return notifications.show({
    withBorder: true,
    position: 'top-right',
    icon: <FaCheck />,
    ...props,
  });
}
