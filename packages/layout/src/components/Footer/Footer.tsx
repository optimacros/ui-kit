import classNames from 'classnames';
import type { FC, ReactNode } from 'react';

import styles from './Footer.module.css';

export interface FooterProps {
    className?: string;
    appVersion?: string;
    copyright?: string;
    children?: ReactNode;
}

export const Footer: FC<FooterProps> = (props) => {
    const classNameContainer = classNames(styles.Container, props.className);

    return (
        <footer className={classNameContainer}>
            {props.appVersion && <span className={styles.Version}>{props.appVersion}</span>}

            {props.copyright && <span className={styles.Copyright}>{props.copyright}</span>}

            {props.children && <div className={styles.Content}>{props.children}</div>}
        </footer>
    );
};
