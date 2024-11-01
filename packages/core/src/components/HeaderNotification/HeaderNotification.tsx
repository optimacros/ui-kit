import classNames from 'classnames';
import type { FC } from 'react';
import { Icon } from '../Icon';

import styles from './HeaderNotification.module.css';
import { HeaderNotificationBadge } from './HeaderNotificationBadge';

import { ICONS_MAP } from '@optimacros/themes';

export interface HeaderNotificationProps {
    notification: Notification;
}

export const HeaderNotification: FC<HeaderNotificationProps & any> = (props) => {
    const { notification } = props;

    if (!notification.visible) {
        return null;
    }

    const className = classNames({
        [styles.Notification]: true,
        [styles.Active]: notification.active,
    });

    return (
        <div className={className} onClick={notification.toggle}>
            <HeaderNotificationBadge notificationUnreadCount={notification.unreadCount} />
            <div className={styles.NotificationIcon}>
                <Icon value={ICONS_MAP.bell} />
            </div>
        </div>
    );
};
