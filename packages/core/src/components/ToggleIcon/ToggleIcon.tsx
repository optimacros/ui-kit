import classNames from 'classnames';
import type { FC } from 'react';
import { ReactSVG } from 'react-svg';

import iconDoubleArrowLeft from '../../icons/icon-double-arrow-left.svg';
import iconDoubleArrowRight from '../../icons/icon-double-arrow-right.svg';

import styles from './ToggleIcon.module.css';

export interface ToggleIconProps {
    isOpen?: boolean;
    handleClick?: () => void;
    wrapperClassName?: string;
    iconClassName?: string;
}

export const ToggleIcon: FC<ToggleIconProps> = (props) => {
    const { isOpen, handleClick, wrapperClassName, iconClassName } = props;
    const iconValue = isOpen ? iconDoubleArrowRight : iconDoubleArrowLeft;

    const title = isOpen ? 'Hide panel' : 'Show panel';

    const className = classNames(wrapperClassName, styles.ToggleButtonWrapper);

    const iconClassNameFinal = classNames(styles.ToggleButtonIcon, iconClassName);

    return (
        <div role="none" className={className} onClick={handleClick} title={title}>
            <ReactSVG className={iconClassNameFinal} src={iconValue} />
        </div>
    );
};
