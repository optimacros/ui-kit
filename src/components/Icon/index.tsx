import React from 'react'
import { Icon as BaseIcon } from 'ui-kit-core'
import type { IconProps as BaseIconProps } from 'ui-kit-core/dist/components/Icon'

import * as icons from './iconsList'

const iconList: Record<
    string,
    ({ fill, opacity }: { fill?: string; opacity?: number }) => React.JSX.Element
> = icons

interface IconComponent {
    name: string;
    fill?: string;
    opacity?: number | string;
}

interface IconProps extends Omit<BaseIconProps, 'value'> {
    value: IconComponent | string | React.ReactElement;
}

export const Icon = (props: IconProps): React.JSX.Element => {
    const { value, ...otherProps } = props

    if (typeof value !== 'string' && 'name' in value) {
        const IconItem = iconList[value.name]

        if (!IconItem) {
            return (
                <BaseIcon
                    {...otherProps}
                    value={value.name}
                />
            )
        }

        return (
            <BaseIcon
                {...otherProps}
                value={(
                    <IconItem
                        fill={value.fill}
                        opacity={Number(value.opacity) || 1}
                    />
                )}
            />
        )
    }

    return (
        <BaseIcon
            {...props}
            value={value}
        />
    )
}
