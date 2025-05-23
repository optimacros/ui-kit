import * as _ from '@optimacros-ui/utils';
import { PureComponent } from 'react';

import styles from './Menu.module.css';

// Unnecessary props from rc-menu
const EXCLUDE_PROPS = [
    'inlineIndent',
    'renderMenuItem',
    'rootPrefixCls',
    'parentMenu',
    'manualRef',
    'eventKey',
    'active',
    'onItemHover',
    'openTransitionName',
    'openAnimation',
    'subMenuOpenDelay',
    'subMenuCloseDelay',
    'forceSubMenuRender',
    'onOpenChange',
    'onDeselect',
    'onSelect',
    'builtinPlacements',
    'itemIcon',
    'expandIcon',
    'openKeys',
    'selectedKeys',
    'triggerSubMenuAction',
    'subMenuKey',
];

interface IMenuItem {
    className;
    children;
    label;
    title;
    onClick;
    disabled;
}

/* eslint-disable */
export default class MenuItem extends PureComponent<IMenuItem> {
    render() {
        const { className, children, label, title, onClick, ...otherProps } = this.props;
        const classNameContainer = _.clsx(
            {
                [styles.MenuItem]: true,
                [styles.MenuItem_disabled]: this.props.disabled,
            },
            className,
        );
        const restProps = _.omit(otherProps, EXCLUDE_PROPS);

        return (
            <li {...restProps} className={classNameContainer}>
                <div
                    className={styles.MenuItemTitleContainer}
                    title={title || label}
                    onClick={this.onClick}
                >
                    <span className={styles.MenuItemTitle}>{label}</span>

                    <div className={styles.MenuItemTitleIcon} />
                </div>
            </li>
        );
    }

    onClick = (event) => {
        if (this.props.disabled) {
            event.stopPropagation();
        }

        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(this.props);
        }
    };
}
/* eslint-enable */
