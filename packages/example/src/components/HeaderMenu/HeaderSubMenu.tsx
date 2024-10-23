import React from 'react';
import { isEmpty, map } from 'lodash';
import { observer } from 'mobx-react';

import type { Element } from './HeaderMenuElement';
import { HeaderMenuElement } from './HeaderMenuElement';

import styles from './HeaderMenu.module.css';

const HEADER_MENU_OFFSET_SUBMENU = 2;
const HEADER_MENU_OFFSET_FROM_WINDOW = 20;

type Props = {
    firstLevel?: boolean;
    rootElementNode: React.RefObject<HTMLLIElement>;
    element: Element;
    elements: Element[] | undefined;
};

@observer
export class HeaderSubMenu extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.rootMenuNode = React.createRef();
    }

    private readonly rootMenuNode: React.RefObject<HTMLDivElement>;

    componentDidMount(): void {
        /**
         * ! После монтирования компонента в dom, устанавливаем корректную позицию, относительно родительского элемента
         */
        if (!this.props.firstLevel) {
            this.setStyles();
        }
    }

    render(): React.JSX.Element | null {
        const { elements, element } = this.props;

        if (isEmpty(elements)) {
            return null;
        }

        return (
            <div className={styles.SubMenu} ref={this.rootMenuNode}>
                <ul className={styles.SubMenuScrollList} id={element.type}>
                    {this.renderList()}
                </ul>
            </div>
        );
    }

    renderList(): (React.JSX.Element | null)[] {
        return map(this.props.elements, (element) => {
            if (element.hidden) {
                return null;
            }

            return <HeaderMenuElement key={element.id} element={element} />;
        });
    }

    private setStyles = (): void => {
        const node = this.props.rootElementNode.current;
        const menu = this.rootMenuNode.current;

        if (menu && node) {
            const {
                top: parentTop,
                left: parentLeft,
                width: parentWidth,
            } = node.getBoundingClientRect();
            const { height: menuHeight, width: menuWidth } = menu.getBoundingClientRect();
            const top = this.getTopPosition(parentTop, menuHeight);
            const left = this.getLeftPosition(parentLeft, menuWidth, parentWidth);

            menu.style.top = `${top}px`;
            menu.style.left = `${left}px`;
        }
    };

    private getTopPosition(parentTop: number, menuHeight: number) {
        const windowsHeight = window.innerHeight;

        if (parentTop + menuHeight < windowsHeight) {
            return parentTop;
        }

        return windowsHeight - menuHeight - HEADER_MENU_OFFSET_FROM_WINDOW;
    }

    private getLeftPosition(parentLeft: number, menuWidth: number, parentWidth: number) {
        const canRight = parentLeft + menuWidth + parentWidth < window.innerWidth;
        const positionForRight = parentLeft + parentWidth - HEADER_MENU_OFFSET_SUBMENU;
        const positionForLeft = parentLeft - menuWidth + HEADER_MENU_OFFSET_SUBMENU;

        return canRight ? positionForRight : positionForLeft;
    }
}
