import type { FC } from 'react';
import { Icon } from '../Icon';

import styles from './HeaderNavigation.module.css';

export interface HeaderNavigationProps {
    title: string;
    onClick?: () => void;
}

export const HeaderNavigation: FC<HeaderNavigationProps> = (props) => {
    const { title, onClick } = props;

    return (
        <div role="none" className={styles.Container} onClick={onClick} title={title}>
            <div className={styles.Element}>
                <div className={styles.Element_IconContainer}>
                    <Icon className={styles.Element_Icon} value="menu" />
                </div>

                <div className={styles.Element_Title}>{title}</div>
            </div>
        </div>
    );
};
