import { Icon as BaseIcon, type IconProps as BaseProps } from '@optimacros-ui/icon';
import { hasIn } from 'lodash-es';
import { isObject } from '@optimacros-ui/utils';
import { ComponentProps, useLayoutEffect, useRef } from 'react';

import './styles.css';

export type IconProps = Omit<ComponentProps<typeof BaseIcon>, 'value'> & {
    value: BaseProps['value'] | { name: string; fill: string; opacity: number };
};

export const Icon = ({ value, ...rest }: IconProps) => {
    const ref = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (ref.current.nodeName !== 'svg') {
            return;
        }

        let valueString = null;

        if (isObject(value) && hasIn(value, 'name')) {
            // @ts-ignore
            valueString = value.name;
        } else if (typeof value === 'string') {
            valueString = value;
        }

        if (!valueString) {
            return;
        }

        ref.current.setAttribute('data-react-toolbox', 'font-icon');

        const title = document.createElement('title');
        title.textContent = valueString;

        ref.current.append(title);
    }, [ref.current]);

    if (isObject(value) && hasIn(value, 'name')) {
        //@ts-ignore
        return (
            <BaseIcon value={value.name} {...value} {...rest} data-style-tag="internal" ref={ref} />
        );
    }

    //@ts-ignore
    return <BaseIcon value={value} {...rest} data-style-tag="internal" ref={ref} />;
};

export const WSIcon = ({ value, ...rest }: IconProps) => {
    return <Icon width="15" height="15" value={value} {...rest} />;
};
