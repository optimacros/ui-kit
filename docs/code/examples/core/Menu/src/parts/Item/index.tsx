import { forward, styled } from '@optimacros-ui/store';
import { useApi, useProxySelector } from '../../state';
import { ItemProps, OptionItemProps as ZagOptionItemProps } from '@zag-js/menu';
import { ReactNode } from 'react';

export type { ItemProps, ItemState } from '@zag-js/menu';

export const Item = forward<ItemProps, 'li'>(
    ({ valueText, children, closeOnSelect, disabled, value, ...rest }, ref) => {
        const props = useProxySelector(
            (api) => api.getItemProps({ value, closeOnSelect, disabled, valueText }),
            [value, closeOnSelect, disabled, valueText],
        );

        return (
            <styled.li {...rest} {...props} ref={ref}>
                {children}
            </styled.li>
        );
    },
    {
        memoize: true,
    },
);

export type NestedItemProps = { children: ReactNode; parent: ReturnType<typeof useApi> };

export const NestedItem = forward<NestedItemProps, 'li'>(({ children, parent, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.li {...rest} ref={ref} {...parent.getTriggerItemProps(api)}>
            {children}
        </styled.li>
    );
});

export type OptionItemProps = ZagOptionItemProps & { children: ReactNode };

export const OptionItem = ({ children, ...item }: OptionItemProps) => {
    const api = useApi();

    return (
        <div key={item.value} {...api.getOptionItemProps(item)}>
            {item.valueText}
        </div>
    );
};
