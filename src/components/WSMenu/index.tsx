import React from 'react'
import { MenuItem as BaseMenuItem, SubMenu as BaseSubMenu } from 'ui-kit-core'

interface Props {
    title: string;
    key: string;
    label?: string;
}
export const WSSubMenu: React.FC<Props> = props => {
    return (
        <BaseSubMenu
            {...props}
            title={props.label || props.title}
        />
    )
}

export const WSMenuItem = (props: Props): React.JSX.Element => {
    const { label, title, ...restProps } = props

    return (
        <BaseMenuItem
            {...restProps}
            title={label || title}
        />
    )
}
