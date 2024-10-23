import type { FC } from 'react';

import { HeaderMenu } from '../HeaderMenu';
import type { MenuElement } from 'components/HeaderMenu/type';

import styles from './HeaderUserMenu.module.css';

export interface HeaderUserMenuProps {
    elements: MenuElement[];
}

export const HeaderUserMenu: FC<HeaderUserMenuProps> = (props) => {
    const { elements } = props;

    return (
        <div className={styles.User}>
            <HeaderMenu elements={elements} />
        </div>
    );
};
