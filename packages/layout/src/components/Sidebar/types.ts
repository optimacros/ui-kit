import { ResourceListType } from '../ResourceList';

export interface SidebarElement {
    rootId: string | number | null;
    id: number | string;
    type: ResourceListType | string;
    label: string;
    opened?: boolean;
    selected?: boolean;
    icon?: ResourceListType | string;
    href?: string;
    onClick?: (element: SidebarElement) => void;
    settingHref?: string;
    settingOnClick?: (element: SidebarElement) => void;
}
