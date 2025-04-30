import { clsx, isEmpty } from '@optimacros-ui/utils';
import React from 'react';

import { Icon } from '../../Icon';
import { observer } from 'mobx-react';
import styles from './HeaderMenu.module.css';
import { Flex } from '@optimacros-ui/flex';
import { FontIcon } from '@optimacros-ui/font-icon';
import { styled } from '@optimacros-ui/store';

interface Props {
    isFirstLevel: boolean;
    element: any;
}
@observer
export default class HeaderMenuElementContainer extends React.Component<Props> {
    render() {
        const { element } = this.props;

        const className = clsx({
            [styles.Element]: true,
            [styles.Element_withIcon]: !!element.icon,
            [styles.ElementContainer]: true,
        });

        return (
            <styled.div
                className={className}
                //@ts-ignore
                disabled={element.disabled}
                onClick={this._onClick}
                data-scope="header"
                data-part="menu-item-container"
            >
                {this.renderIcon(element)}

                <styled.div
                    data-scope="header"
                    data-part="menu-item-container-title"
                    className={styles.Element_Title}
                >
                    {element.title}
                </styled.div>

                {this.renderArrowIcon()}
            </styled.div>
        );
    }

    renderIcon(element) {
        if (!element.icon) {
            return null;
        }

        if (['add', 'dashboard', 'list'].includes(element.icon)) {
            return (
                <Flex
                    justify="center"
                    className={styles.Element_IconContainer}
                    data-testid="header-menu-item-icon-container"
                >
                    <FontIcon className={styles.Element_Icon} value={element.icon} />
                </Flex>
            );
        }

        return (
            <Flex
                justify="center"
                className={styles.Element_IconContainer}
                data-testid="header-menu-item-icon-container"
            >
                <Icon className={styles.Element_Icon} value={element.icon} />
            </Flex>
        );
    }

    renderArrowIcon() {
        const { element, isFirstLevel } = this.props;

        //@ts-ignore
        if (isFirstLevel || isEmpty(element.children) || element.disabled) {
            return null;
        }

        return (
            <styled.div data-scope="header" data-part="menu-item-arrow-icon">
                <Icon className={styles.Element_Arrow} value="navigate_next" />
            </styled.div>
        );
    }

    _onClick = () => {
        const { element } = this.props;

        //@ts-ignore
        if (!element.disabled && element.open) {
            //@ts-ignore
            element.open();
        }
    };
}
