// @ts-nocheck
import { ReactNode, Component } from 'react';

import styles from './HeaderUserMenu.module.css';

interface Props {
    className: string;
    userName: string;
    children: ReactNode;
}

export class HeaderUserMenu extends Component<Props> {
    render() {
        return (
            <div className={styles.headerNav}>
                <ul className={styles.headerNav_List}>
                    <li className={styles.headerNav_Item}>{this.renderDropDown()}</li>
                </ul>
            </div>
        );
    }

    renderDropDown() {
        return (
            <div className={styles.userMenu}>
                <div className={styles.userMenu_Title}>{this.props.userName || ' '}</div>
                <div className={styles.userMenu_List}>
                    <ul>
                        <li className={styles.userMenu_Name}>
                            <span>{this.props.userName || ' '}</span>
                        </li>

                        {this.props.children}
                    </ul>
                </div>
            </div>
        );
    }
}
