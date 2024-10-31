import classNames from 'classnames';
import { isEmpty } from 'lodash';
import { useRef, useState } from 'react';
import type { FC } from 'react';

import { HeaderMenuElementContainer } from './HeaderMenuElementContainer';
import { HeaderSubMenu } from './HeaderSubMenu';
import type { MenuElement } from './type';

import styles from './HeaderMenu.module.css';

export interface HeaderMenuElementProps {
    element: MenuElement;
    firstLevel?: boolean;
}

export const HeaderMenuElement: FC<HeaderMenuElementProps> = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const node = useRef<HTMLLIElement>(null);

    const { element, firstLevel } = props;

    if (element.hidden) {
        return null;
    }

    const onMouseEnter = (): void => {
        setShowMenu(true);
    };

    const onMouseLeave = (): void => {
        setShowMenu(false);
    };

    const className = classNames({
        [styles.MenuItem]: true,
        [styles.MenuItem__disabled]: element.disabled,
        [styles.MenuItem_child]: element.isChild,
        [styles.MenuItem_parent]: element.isParent,
    });

    return (
        <li
            className={className}
            ref={node}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            title={element.title}
        >
            <HeaderMenuElementContainer element={element} isFirstLevel={firstLevel} />

            {!showMenu || isEmpty(element.children) ? null : (
                <HeaderSubMenu
                    element={element}
                    elements={element.children}
                    rootElementNode={node}
                    firstLevel={firstLevel}
                />
            )}
        </li>
    );
};
