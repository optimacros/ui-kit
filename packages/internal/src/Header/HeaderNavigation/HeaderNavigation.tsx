import { Component } from 'react';

import { Icon } from '../../Icon';
import { styled } from '@optimacros-ui/store';
import styles from './HeaderNavigation.module.css';

interface Props {
    title: string;
    onClick: () => void;
}

export class HeaderNavigation extends Component<Props> {
    render() {
        return (
            <styled.div
                data-scope="header"
                data-part="navigation"
                className={styles.Container}
                title={this.props.title}
                onClick={this.props.onClick}
            >
                <styled.div
                    data-scope="header"
                    data-part="navigation-element"
                    className={styles.Element}
                >
                    <styled.div
                        data-scope="header"
                        data-part="navigation-icon"
                        className={styles.Element_IconContainer}
                    >
                        <Icon className={styles.Element_Icon} value="menu" />
                    </styled.div>

                    <styled.div
                        data-scope="header"
                        data-part="navigation-title"
                        className={styles.Element_Title}
                    >
                        {this.props.title}
                    </styled.div>
                </styled.div>
            </styled.div>
        );
    }
}
