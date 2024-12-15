import { createElement, ReactNode } from 'react';
import type { IconProps } from 'ui-kit-core/dist/components/Icon';

import { WSIcon as Icon } from '../../WSIcon';

import styles from './HeaderUserMenu.module.css';

interface Props {
    href: string;
    label: string;
    className: string;
    children: ReactNode;
    icon: IconProps['value'];
    onClick: () => void;
}

export const HeaderUserMenuElement = (props: Props) => {
    const { className, onClick, label, icon, children, ...otherProps } = props;
    const tag = props.href ? 'a' : 'span';

    return (
        <li className={className} title={label} onClick={onClick}>
            {' '}
            {createElement(
                tag,
                otherProps,
                icon ? <Icon className={styles.Icon} value={icon} /> : null,
                <div className={styles.Label}>
                    {label}
                    {children}
                </div>,
            )}
        </li>
    );
};
