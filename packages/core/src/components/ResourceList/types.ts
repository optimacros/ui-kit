export enum ResourceListType {
    AM = 'AM',
    Workspace = 'Workspace',
    Folder = 'Folder',
}

export enum ResourceListDynamicStatus {
    selected = 'selected',
    opened = 'opened',
}

export interface ResourceListElement {
    id: number | string;
    type: ResourceListType | string;
    label: string;
    opened: boolean;
    selected: boolean;
    icon?: ResourceListType | string;
    href?: string;
    onClick?: (element: ResourceListElement) => void;
    settingHref?: string;
    settingOnClick?: (element: ResourceListElement) => void;
    children?: ResourceListElement[];
}
