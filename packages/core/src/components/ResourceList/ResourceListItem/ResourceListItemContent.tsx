import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

import { ResourceListType } from '../types';
import { getLeftIcon } from '../utils/getLeftIcon';

import styles from './ResourceListItem.module.css';
import { Icon } from '../../Icon/src';
import { ICONS_MAP } from '@optimacros-ui/themes';

interface ResourceListItemContentProps {
    label: string;
    opened: boolean;
    icon: ResourceListType | string | undefined;
    getIcon: ((icon: ResourceListType | string) => string) | undefined;
    getOpenedIcon: ((icon: ResourceListType | string) => string) | undefined;
    shouldShowRightIcon?: boolean;
}

export const ResourceListItemContent: FC<ResourceListItemContentProps> = (props) => {
    const { icon, getIcon, getOpenedIcon, opened, label, shouldShowRightIcon = false } = props;

    const [leftIcon, setLeftIcon] = useState<string | null>(null);

    useEffect(() => {
        if (!icon) {
            return;
        }

        if (opened && getOpenedIcon) {
            setLeftIcon(getOpenedIcon(icon));

            return;
        }

        setLeftIcon(getLeftIcon(icon, getIcon));
    }, [icon, opened, getIcon, getOpenedIcon]);

    return (
        <>
            {leftIcon ? (
                <div className={styles.Icon}>
                    <ReactSVG src={leftIcon} />
                </div>
            ) : null}

            <div className={styles.Label}>{label}</div>

            {shouldShowRightIcon ? (
                <div className={classNames(styles.Icon, styles.RightIcon)}>
                    <Icon value={ICONS_MAP.arr} />
                </div>
            ) : null}
        </>
    );
};
