import React from 'react';
import { MenuItem as BaseMenuItem, SubMenu as BaseSubMenu } from 'ui-kit-core';

interface Props {
    title: string;
    key: string;
    label?: string;
    children: React.ReactNode;
}

export { default as WSMenu } from './Menu';
export { default as WSMenuItem } from './MenuItem';
export { default as WSSubMenu } from './SubMenuContainer';

export const SubMenu: React.FC<Props> = (props) => {
    const { label, title, ...restProps } = props;

    return <BaseSubMenu {...restProps} title={label || title} />;
};

export const MenuItem = (props: Props): React.JSX.Element => {
    const { label, title, children, ...restProps } = props;

    return (
        <BaseMenuItem {...restProps} title={label || title}>
            {label || title || children}
        </BaseMenuItem>
    );
};
