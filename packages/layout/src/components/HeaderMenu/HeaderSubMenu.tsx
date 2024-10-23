import { isEmpty } from 'lodash';
import type { RefObject, FC } from 'react';
import { useEffect, useRef } from 'react';

import { HeaderMenuElement } from './HeaderMenuElement';
import type { MenuElement } from './type';

import styles from './HeaderMenu.module.css';

const HEADER_MENU_OFFSET_SUBMENU = 2;
const HEADER_MENU_OFFSET_FROM_WINDOW = 20;

export interface HeaderSubMenuProps {
    firstLevel?: boolean;
    rootElementNode: RefObject<HTMLLIElement>;
    element: MenuElement;
    elements?: MenuElement[];
}

export const HeaderSubMenu: FC<HeaderSubMenuProps> = (props) => {
    const { element, rootElementNode, elements, firstLevel } = props;
    const rootMenuNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /**
         * ! После монтирования компонента в dom, устанавливаем корректную позицию, относительно родительского элемента
         */
        if (!rootElementNode?.current || !rootMenuNode?.current) {
            return;
        }

        if (!firstLevel) {
            setStyles();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rootElementNode, rootMenuNode, firstLevel]);

    const getLeftPosition = (parentLeft: number, menuWidth: number, parentWidth: number) => {
        const canRight = parentLeft + menuWidth + parentWidth < window.innerWidth;
        const positionForRight = parentLeft + parentWidth - HEADER_MENU_OFFSET_SUBMENU;
        const positionForLeft = parentLeft - menuWidth + HEADER_MENU_OFFSET_SUBMENU;

        return canRight ? positionForRight : positionForLeft;
    };

    const getTopPosition = (parentTop: number, menuHeight: number) => {
        const windowsHeight = window.innerHeight;

        if (parentTop + menuHeight < windowsHeight) {
            return parentTop;
        }

        return windowsHeight - menuHeight - HEADER_MENU_OFFSET_FROM_WINDOW;
    };

    const setStyles = (): void => {
        const node = rootElementNode.current;
        const menu = rootMenuNode.current;

        if (menu && node) {
            const {
                top: parentTop,
                left: parentLeft,
                width: parentWidth,
            } = node.getBoundingClientRect();
            const { height: menuHeight, width: menuWidth } = menu.getBoundingClientRect();
            const top = getTopPosition(parentTop, menuHeight);
            const left = getLeftPosition(parentLeft, menuWidth, parentWidth);

            menu.style.top = `${top}px`;
            menu.style.left = `${left}px`;
        }
    };

    if (isEmpty(elements)) {
        return null;
    }

    return (
        <div className={styles.SubMenu} ref={rootMenuNode}>
            <ul className={styles.SubMenuScrollList} id={element.type}>
                {elements?.map((item) => {
                    if (item.hidden) {
                        return null;
                    }

                    return <HeaderMenuElement key={item.id} element={item} />;
                })}
            </ul>
        </div>
    );
};
