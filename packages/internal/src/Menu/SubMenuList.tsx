// @ts-nocheck
import React, { Component } from 'react';

import styles from './Menu.module.css';

const SUBMENU_OFFSET = 2;
const SUBMENU_OFFSET_FROM_WINDOW = 20;

/* eslint-disable */
export default class SubMenuList extends Component {
    constructor(props) {
        super(props);

        this._rootMenuNode = React.createRef();
    }

    componentDidMount() {
        this._setStyles();
    }

    render() {
        return (
            <ul ref={this._rootMenuNode} className={styles.SubMenuContainer}>
                {this.props.children}
            </ul>
        );
    }

    _setStyles = () => {
        const node = this.props.parentNode.current;
        const menu = this._rootMenuNode.current;

        if (menu && node) {
            const {
                top: parentTop,
                left: parentLeft,
                width: parentWidth,
            } = node.getBoundingClientRect();
            const { height: menuHeight, width: menuWidth } = menu.getBoundingClientRect();
            const top = this._getTopPosition(parentTop, menuHeight);
            const left = this._getLeftPosition(parentLeft, menuWidth, parentWidth);

            menu.style.top = `${top}px`;
            menu.style.left = `${left}px`;
        }
    };

    _getTopPosition(parentTop, menuHeight) {
        const windowsHeight = window.innerHeight;

        if (parentTop + menuHeight < windowsHeight) {
            return parentTop;
        }

        return windowsHeight - menuHeight - SUBMENU_OFFSET_FROM_WINDOW;
    }

    _getLeftPosition(parentLeft, menuWidth, parentWidth) {
        const canRight = parentLeft + menuWidth + parentWidth < window.innerWidth;
        const positionForRight = parentLeft + parentWidth - SUBMENU_OFFSET;
        const positionForLeft = parentLeft - menuWidth + SUBMENU_OFFSET;

        return canRight ? positionForRight : positionForLeft;
    }
}
/* eslint-enable */
