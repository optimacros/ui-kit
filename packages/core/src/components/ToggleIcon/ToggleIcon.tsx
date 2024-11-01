import classNames from 'classnames';
import type { FC } from 'react';
import styles from './ToggleIcon.module.css';

import { Icon } from '../Icon';
import { ICONS_MAP } from '@optimacros/themes';

export interface ToggleIconProps {
    isOpen?: boolean;
    handleClick?: () => void;
    wrapperClassName?: string;
    iconClassName?: string;
}

export const ToggleIcon: FC<ToggleIconProps> = (props) => {
    const { isOpen, handleClick, wrapperClassName, iconClassName } = props;
    const iconValue = isOpen
        ? ICONS_MAP['keyboard-double-arrow-right']
        : ICONS_MAP['keyboard-double-arrow-left'];

    const title = isOpen ? 'Hide panel' : 'Show panel';

    const className = classNames(wrapperClassName, styles.ToggleButtonWrapper);

    const iconClassNameFinal = classNames(styles.ToggleButtonIcon, iconClassName);

    return (
        <div role="none" className={className} onClick={handleClick} title={title}>
            <Icon className={iconClassNameFinal} value={iconValue} />
        </div>
    );
};
