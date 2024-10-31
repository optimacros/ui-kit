import classNames from 'classnames';
import type { FC } from 'react';
import { ReactSVG } from 'react-svg';

import { HeaderNotificationBadge } from './HeaderNotificationBadge';
import type { Notification } from './type';
import iconBell from '../../icons/icon-bell.svg';

import styles from './HeaderNotification.module.css';

export interface HeaderNotificationProps {
    notification: Notification;
}

export const HeaderNotification: FC<HeaderNotificationProps> = (props) => {
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
                <ReactSVG src={iconBell} />
            </div>
        </div>
    );
};
