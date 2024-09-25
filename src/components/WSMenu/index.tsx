import React from 'react'
import { MenuItem as BaseMenuItem, SubMenu as BaseSubMenu } from 'ui-kit-core'

interface Props {
    title: string;
    key: string;
    label?: string;
    children: React.ReactNode;
}

export const WSSubMenu: React.FC<Props> = props => {
    const { label, title, ...restProps } = props

    return (
        <BaseSubMenu
            {...restProps}
            title={label || title}
        />
    )
}

export const WSMenuItem = (props: Props): React.JSX.Element => {
    const { label, title, children, ...restProps } = props

    return (
        <BaseMenuItem
            {...restProps}
            title={label || title}
        >
            {label || title || children}
        </BaseMenuItem>
    )
}
