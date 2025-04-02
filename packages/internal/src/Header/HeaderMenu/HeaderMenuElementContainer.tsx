import { clsx, isEmpty } from '@optimacros-ui/utils';
import React from 'react';

import { Icon } from '../../Icon';

import styles from './HeaderMenu.module.css';
import { Flex } from '@optimacros-ui/flex';
import { FontIcon } from '@optimacros-ui/font-icon';

interface Props {
    isFirstLevel: boolean;
    element: any;
}

export default class HeaderMenuElementContainer extends React.Component<Props> {
    render() {
        const { element } = this.props;

        const className = clsx({
            [styles.Element]: true,
            [styles.Element_withIcon]: !!element.icon,
            [styles.ElementContainer]: true,
        });

        return (
            <div
                className={className}
                //@ts-ignore
                disabled={element.disabled}
                onClick={this._onClick}
            >
                {this.renderIcon(element)}

                <div className={styles.Element_Title}>{element.title}</div>

                {this.renderArrowIcon()}
            </div>
        );
    }

    renderIcon(element) {
        if (!element.icon) {
            return null;
        }

        // Иконки, которые (пока) в свг выглядят некорректно
        if (['add', 'dashboard', 'list'].includes(element.icon)) {
            return (
                <Flex justify="center" className={styles.Element_IconContainer}>
                    <FontIcon className={styles.Element_Icon} value={element.icon} />
                </Flex>
            );
        }

        return (
            <Flex justify="center" className={styles.Element_IconContainer}>
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
            <div>
                <Icon className={styles.Element_Arrow} value="navigate_next" />
            </div>
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
