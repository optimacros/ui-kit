import classNames from 'classnames';
import { isEmpty } from 'lodash';
import type { FC } from 'react';
import { ReactSVG } from 'react-svg';
import { Icon } from '../Icon';

import type { MenuElement } from './type';

import styles from './HeaderMenu.module.css';

export interface HeaderMenuElementContainerProps {
    element: MenuElement;
    isFirstLevel?: boolean;
}

export const HeaderMenuElementContainer: FC<HeaderMenuElementContainerProps> = (props) => {
    const { element, isFirstLevel } = props;

    const onClick = (): void => {
        if (!element.disabled && element.open) {
            element.open();
        }
    };

    const className = classNames({
        [styles.Element]: true,
        [styles.Element_withIcon]: !!element.icon,
        [styles.ElementContainer]: true,
    });

    return (
        <div role="none" className={className} onClick={onClick}>
            {!element.icon ? null : (
                <div className={styles.Element_IconContainer}>
                    {element.icon.includes('.svg') || element.icon.includes('data:image/svg') ? (
                        <ReactSVG className={styles.Element_Icon} src={element.icon} />
                    ) : (
                        <Icon className={styles.Element_Icon} value={element.icon} />
                    )}
                </div>
            )}

            <div className={styles.Element_Title}>{element.title}</div>

            {isFirstLevel || isEmpty(element.children) || element.disabled ? null : (
                <div>
                    <Icon className={styles.Element_Arrow} value="navigate_next" />
                </div>
            )}
        </div>
    );
};
