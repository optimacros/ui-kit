import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import { ResourceListItem } from '../ResourceListItem';
import { ResourceListDynamicStatus, ResourceListElement, ResourceListType } from '../types';

import styles from './ResourceSubList.module.css';

interface ResourceSubListProps {
    nestingLevel: number;
    listItem: ResourceListElement;
    handleUpdateResourceList: (
        itemId: number | string,
        property: ResourceListDynamicStatus,
    ) => void;
    getIcon: ((icon: ResourceListType | string) => string) | undefined;
    getOpenedIcon: ((icon: ResourceListType | string) => string) | undefined;
}

export const ResourceSubList: FC<PropsWithChildren<ResourceSubListProps>> = (props) => {
    const { listItem, children, nestingLevel, getIcon, getOpenedIcon, handleUpdateResourceList } =
        props;

    const subListClassNames = classNames({
        [styles.ResourceSubList]: true,
        [styles.Opened]: listItem.opened,
    });

    return (
        <div className={subListClassNames}>
            <ResourceListItem
                listItem={listItem}
                nestingLevel={nestingLevel}
                handleUpdateResourceList={handleUpdateResourceList}
                getIcon={getIcon}
                getOpenedIcon={getOpenedIcon}
            />

            <div className={styles.Content}>{children}</div>
        </div>
    );
};
