import { Icon as BaseIcon, type IconProps as BaseProps } from '@optimacros-ui/icon';
import { hasIn } from 'lodash-es';
import { isObject } from '@optimacros-ui/utils';
import { ComponentProps } from 'react';

import './styles.css';

export type IconProps = Omit<ComponentProps<typeof BaseIcon>, 'value'> & {
    value: BaseProps['value'] | { name: string; fill: string; opacity: number };
};

export const Icon = ({ value, ...rest }: IconProps) => {
    if (isObject(value) && hasIn(value, 'name')) {
        //@ts-ignore
        return <BaseIcon value={value.name} {...value} {...rest} data-style-tag="internal" />;
    }

    //@ts-ignore
    return <BaseIcon value={value} {...rest} data-style-tag="internal" />;
};

export const WSIcon = ({ value, ...rest }: IconProps) => {
    return <Icon width="15" height="15" value={value} {...rest} />;
};
