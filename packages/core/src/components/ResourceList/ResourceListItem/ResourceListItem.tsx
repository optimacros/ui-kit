import classNames from 'classnames';
import { isUndefined } from '@optimacros-ui/utils';
import type { FC } from 'react';

import { ResourceListItemContent } from './ResourceListItemContent';
import { ResourceListDynamicStatus, ResourceListElement, ResourceListType } from '../types';

import styles from './ResourceListItem.module.css';
import { Icon } from '../../Icon/src';
import { ICONS_MAP } from '@optimacros-ui/themes';

export interface ResourceListItemProps {
    listItem: ResourceListElement;
    nestingLevel: number;
    handleUpdateResourceList: (
        itemId: number | string,
        property: ResourceListDynamicStatus,
    ) => void;
    getIcon: ((icon: ResourceListType | string) => string) | undefined;
    getOpenedIcon: ((icon: ResourceListType | string) => string) | undefined;
}

export const ResourceListItem: FC<ResourceListItemProps> = (props) => {
    const { listItem, nestingLevel, getIcon, getOpenedIcon, handleUpdateResourceList } = props;

    const { label, opened, selected, icon, href, settingHref } = listItem;

    const className = classNames({
        [styles.ResourceListItem]: true,
        [styles.Selected]: selected,
    });

    const listItemPaddingLeft = 30 * nestingLevel;

    const handleClick = (): void => {
        if (listItem.onClick) {
            listItem.onClick(listItem);
        }

        if (listItem.children) {
            handleUpdateResourceList(listItem.id, ResourceListDynamicStatus.opened);

            return;
        }

        handleUpdateResourceList(listItem.id, ResourceListDynamicStatus.selected);
    };

    const handleSettingClick = (): void => {
        if (listItem.settingOnClick) {
            listItem.settingOnClick(listItem);
        }
    };

    if (!isUndefined(href)) {
        return (
            <div className={styles.Container}>
                <a
                    href={href}
                    className={className}
                    onClick={handleClick}
                    style={{ paddingLeft: `${listItemPaddingLeft}px` }}
                >
                    <ResourceListItemContent
                        shouldShowRightIcon
                        icon={icon}
                        label={label}
                        opened={opened}
                        getIcon={getIcon}
                        getOpenedIcon={getOpenedIcon}
                    />
                </a>
                {settingHref ? (
                    <a
                        className={styles.Setting}
                        target="_blank"
                        href={settingHref}
                        onClick={handleSettingClick}
                        rel="noreferrer"
                    >
                        <div className={styles.Icon}>
                            <Icon value={ICONS_MAP.settings} />
                        </div>
                    </a>
                ) : null}
            </div>
        );
    }

    return (
        <div
            className={className}
            onClick={handleClick}
            style={{ paddingLeft: `${listItemPaddingLeft}px` }}
        >
            <ResourceListItemContent
                icon={icon}
                label={label}
                opened={opened}
                getIcon={getIcon}
                getOpenedIcon={getOpenedIcon}
            />
        </div>
    );
};
