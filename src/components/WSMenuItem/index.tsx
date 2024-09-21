import React from 'react'
import { MenuItem as BaseMenuItem } from 'ui-kit-core'

interface Props {
    title: string;
    key: string;
    label?: string;
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
