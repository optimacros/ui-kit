import { Component } from 'react';

import { Icon } from '../../Icon';

import styles from './HeaderNavigation.module.css';

interface Props {
    title: string;
    onClick: () => void;
}

export class HeaderNavigation extends Component<Props> {
    render() {
        return (
            <div className={styles.Container} title={this.props.title} onClick={this.props.onClick}>
                <div className={styles.Element}>
                    <div className={styles.Element_IconContainer}>
                        <Icon className={styles.Element_Icon} value="menu" />
                    </div>

                    <div className={styles.Element_Title}>{this.props.title}</div>
                </div>
            </div>
        );
    }
}
