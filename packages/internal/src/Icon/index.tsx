import { Icon as BaseIcon, type IconProps as BaseProps } from '@optimacros-ui/icon';
import { hasIn } from 'lodash-es';
import { isObject } from '@optimacros-ui/utils';

export type IconProps = Omit<ComponentProps<typeof BaseIcon>, 'value'> & {
    value: BaseProps['value'] | { name: string; fill: string; opacity: number };
};

export const Icon = ({ value, ...rest }: IconProps) => {
    if (isObject(value) && hasIn(value, 'name')) {
        //@ts-ignore
        return <BaseIcon value={value.name} {...value} {...rest} />;
    }

    //@ts-ignore

    return <BaseIcon value={value} {...rest} />;
};

import { startsWith, kebabCase } from '@optimacros-ui/utils';
import { ComponentProps } from 'react';

// value может прийти в виде { name: string, fill?: string, opacity?: string }
export const iconValueParser = (value: any) => {
    if (typeof value === 'object' && Object.hasOwn(value, 'name')) {
        if (startsWith(value.name, 'icon')) {
            return kebabCase(value.name.replace('icon', ''));
        }

        return value.name;
    }

    return value;
};

export const WSIcon = ({ value: valueProp, ...rest }: IconProps) => {
    const value = iconValueParser(valueProp);

    return <Icon width="15" height="15" value={value} {...rest} />;
};
