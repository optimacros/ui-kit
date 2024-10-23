import { ResourceListDynamicStatus, ResourceListElement } from '../types.ts';

export const updateResourceList = (
    list: ResourceListElement[],
    itemId: number | string,
    property: ResourceListDynamicStatus,
): ResourceListElement[] => {
    const isChangingSelectedProperty = property === ResourceListDynamicStatus.selected;

    return list.map((item) => {
        const isCurrentItem = item.id === itemId;

        if (isCurrentItem) {
            return { ...item, [property]: !item[property] };
        } else if (item.children && item.children.length > 0) {
            return { ...item, children: updateResourceList(item.children, itemId, property) };
        }

        return isChangingSelectedProperty ? { ...item, selected: false } : item;
    });
};
