import React from 'react';
import classNames from 'classnames';
import { isEmpty } from '@optimacros/ui-kit-utils';
import { observer } from 'mobx-react';

import type { Element } from './HeaderMenuElement';
import { Icon } from '../';

import styles from './HeaderMenu.module.css';

type Props = {
    element: Element;
    isFirstLevel?: boolean;
};

@observer
export class HeaderMenuElementContainer extends React.Component<Props> {
    render(): React.JSX.Element {
        const { element } = this.props;

        const className = classNames({
            [styles.Element]: true,
            [styles.Element_withIcon]: !!element.icon,
            [styles.ElementContainer]: true,
        });

        return (
            <div role="none" className={className} onClick={this.onClick}>
                {this.renderIcon(element)}

                <div className={styles.Element_Title}>{element.title}</div>

                {this.renderArrowIcon()}
            </div>
        );
    }

    renderIcon(element: Element): React.JSX.Element | null {
        if (!element.icon) {
            return null;
        }

        return (
            <div className={styles.Element_IconContainer}>
                <Icon className={styles.Element_Icon} value={element.icon} />
            </div>
        );
    }

    renderArrowIcon(): React.JSX.Element | null {
        const { element, isFirstLevel } = this.props;

        if (isFirstLevel || isEmpty(element.children) || element.disabled) {
            return null;
        }

        return (
            <div>
                <Icon className={styles.Element_Arrow} value="navigate_next" />
            </div>
        );
    }

    private onClick = (): void => {
        const { element } = this.props;

        if (!element.disabled && element.open) {
            element.open();
        }
    };
}
