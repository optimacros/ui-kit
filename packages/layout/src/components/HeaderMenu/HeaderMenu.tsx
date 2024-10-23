import classNames from 'classnames';
import { isEmpty, map } from 'lodash';
import type { FC, JSX } from 'react';

import { HeaderMenuElement } from './HeaderMenuElement';
import type { MenuElement } from './type';

import styles from './HeaderMenu.module.css';

export interface HeaderMenuProps {
    elements: MenuElement[];
    className?: string;
}

export const HeaderMenu: FC<HeaderMenuProps> = (props) => {
    const { elements, className } = props;

    if (isEmpty(elements)) {
        return null;
    }

    const finalClassName = classNames(styles.Container, className);

    const renderList = (): (JSX.Element | null)[] => {
        return map(elements, (element) => {
            if (element.hidden) {
                return null;
            }

            return <HeaderMenuElement key={element.id} element={element} firstLevel />;
        });
    };

    return (
        <div className={finalClassName}>
            <ul className={styles.Menu}>{renderList()}</ul>
        </div>
    );
};
