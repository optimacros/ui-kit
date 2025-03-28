import { clsx } from '@optimacros-ui/utils';
import { PureComponent } from 'react';

import styles from './Menu.module.css';

interface IMenu {
    className;
    children;
    prefixCls;
}

export default class Menu extends PureComponent<IMenu> {
    render() {
        const { className, children, prefixCls, ...otherProps } = this.props;
        const classNameContainer = clsx(styles.MenuContainer, className);

        return (
            <div className={styles.MenuContainer}>
                <ul {...otherProps} className={classNameContainer}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
