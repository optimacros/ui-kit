import React, { isValidElement } from 'react';
import { Icon as BaseIcon } from 'ui-kit-core';
import type { IconProps as BaseIconProps } from 'ui-kit-core/dist/components/Icon';

import * as icons from './iconsList';

const iconList: Record<
    string,
    ({ fill, opacity }: { fill?: string; opacity?: number }) => React.JSX.Element
> = icons;

interface IconComponent {
    name: string;
    fill?: string;
    opacity?: number | string;
}

interface IconProps extends Omit<BaseIconProps, 'value'> {
    value: IconComponent | string | React.ReactElement;
}

export const WSIcon = (props: IconProps): React.JSX.Element => {
    const { value, ...otherProps } = props;

    if (typeof value === 'object' && !isValidElement(value)) {
        const IconItem = iconList[(value as IconComponent).name];

        if (!IconItem) {
            return <BaseIcon {...otherProps} value={(value as IconComponent).name} />;
        }

        return (
            <BaseIcon
                {...otherProps}
                value={
                    <IconItem
                        fill={(value as IconComponent).fill}
                        opacity={Number((value as IconComponent).opacity) || 1}
                    />
                }
            />
        );
    }

    return <BaseIcon {...props} value={value} />;
};
