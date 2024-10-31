export type MenuElement = {
    id: string;
    title: string;
    open?: () => void;
    icon?: string;
    hidden?: boolean;
    disabled?: boolean;
    isChild?: boolean;
    isParent?: boolean;
    children?: MenuElement[];
    type?: string;
};
