// @ts-nocheck
import classNames from 'classnames';
import { PureComponent } from 'react';

import styles from './Menu.module.css';

/* eslint-disable */
export default class Menu extends PureComponent {
    render() {
        const { className, children, prefixCls, ...otherProps } = this.props;
        const classNameContainer = classNames(styles.MenuContainer, className);

        return (
            <div className={styles.MenuContainer}>
                <ul {...otherProps} className={classNameContainer}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
/* eslint-enable */
