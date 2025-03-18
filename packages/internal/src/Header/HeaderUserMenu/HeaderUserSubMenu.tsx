import { clsx } from '@optimacros-ui/utils';
import { ReactNode } from 'react';

import styles from './HeaderUserMenu.module.css';

interface Props {
    label: string;
    className: string;
    children: ReactNode;
    onClick: () => void;
}

export const HeaderUserSubMenu = (props: Props) => {
    const className = clsx(styles.userMenu_List, styles.userMenu_List_SubMenu, props.className);

    return (
        <li>
            <span title={props.label} onClick={props.onClick}>
                {props.label}
            </span>

            <ul className={className}>{props.children}</ul>
        </li>
    );
};
