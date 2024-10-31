import classNames from 'classnames';
import { FC, JSX, useEffect, useState } from 'react';

import { ResourceListItem } from './ResourceListItem';
import { ResourceSubList } from './ResourceSubList';
import { ResourceListDynamicStatus, ResourceListElement, ResourceListType } from './types';
import { updateResourceList } from './utils/updateResourceList';

import styles from './ResourceList.module.css';

interface ResourceListProps {
    elements: ResourceListElement[];
    className?: string;
    getIcon?: (icon: ResourceListType | string) => string;
    getOpenedIcon?: (icon: ResourceListType | string) => string;
}

export const ResourceList: FC<ResourceListProps> = (props) => {
    const { elements, className = '', getIcon, getOpenedIcon } = props;
    const [resourceList, setResourceList] = useState(elements);

    useEffect(() => {
        setResourceList(elements);
    }, [elements]);

    const handleUpdateResourceList = (
        itemId: number | string,
        property: ResourceListDynamicStatus,
    ): void => {
        setResourceList((prev) => {
            return updateResourceList(prev, itemId, property);
        });
    };

    const renderListItem = (listItem: ResourceListElement, nestingLevel = 1): JSX.Element => {
        if (listItem.children?.length) {
            return (
                <ResourceSubList
                    key={listItem.id}
                    nestingLevel={nestingLevel}
                    listItem={listItem}
                    handleUpdateResourceList={handleUpdateResourceList}
                    getIcon={getIcon}
                    getOpenedIcon={getOpenedIcon}
                >
                    {listItem.children.map((item) => renderListItem(item, nestingLevel + 1))}
                </ResourceSubList>
            );
        }

        return (
            <ResourceListItem
                key={listItem.id}
                nestingLevel={nestingLevel}
                listItem={listItem}
                handleUpdateResourceList={handleUpdateResourceList}
                getIcon={getIcon}
                getOpenedIcon={getOpenedIcon}
            />
        );
    };

    return (
        <div className={classNames(styles.Container, className)}>
            {resourceList.map((item) => renderListItem(item))}
        </div>
    );
};
