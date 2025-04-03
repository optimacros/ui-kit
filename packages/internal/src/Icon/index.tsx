export { Icon, type IconProps } from '@optimacros-ui/icon';
import { Icon, type IconProps } from '@optimacros-ui/icon';

import { startsWith, kebabCase } from '@optimacros-ui/utils';

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
