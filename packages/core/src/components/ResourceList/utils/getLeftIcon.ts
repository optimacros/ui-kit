import { defaultIconList } from './constants';
import { ResourceListType } from '../types';

export const getLeftIcon = (
    icon: ResourceListType | string,
    getIcon: ((icon: ResourceListType | string) => string) | undefined,
): string | null => {
    const defaultIcon = defaultIconList[icon as ResourceListType];

    if (defaultIcon) {
        return defaultIcon;
    }

    if (!defaultIcon && getIcon) {
        return getIcon(icon);
    }

    return null;
};
