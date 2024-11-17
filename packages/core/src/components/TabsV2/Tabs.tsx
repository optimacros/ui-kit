import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as tabs from '@zag-js/tabs';
import { tw } from '@optimacros/ui-kit-utils';
import { ReactNode } from 'react';

// TODO: enrich api with methods from '../Tabs'
export const rootClassName = tw``;

//TODO: make useApi extendable with methods
export const { Api, Provider, Root, useApi } = createReactApiStateContext({
    api: null as tabs.Api,
    id: 'tabs',
    machine: tabs,
    initialState: null,
    rootAsTag: true,
    useRootProps(api) {
        return {
            ...api.getRootProps(),
            className: rootClassName,
        };
    },
});

export const listClassName = 'flex relative z-1';
export const List = forward<{ children: ReactNode }, 'ul'>((props, ref) => {
    const api = useApi();

    return <styled.ul {...props} {...api.getListProps()} ref={ref} className={listClassName} />;
});

export const triggerClassName = tw`first:pr-3 last:pl-3 not-last:not-first:px-3
border-solid border-[var(--border)] border-b-1 cursor-pointer
data-focus:border-[var(--border-focus)] data-focus:text-[var(--text-focus)]
data-selected:border-[var(--border-focus)] data-selected:text-[var(--text-focus)] select-none data-focus:shadow-[var(--shadow-focus)]
outline-none text-sm
`;
export const Trigger = forward<{ children: ReactNode; value: string; disabled?: boolean }, 'li'>(
    ({ value, disabled, ...rest }, ref) => {
        const api = useApi();

        const apiProps = api.getTriggerProps({ value, disabled });

        return (
            <styled.li
                {...rest}
                {...apiProps}
                ref={ref}
                className={triggerClassName}
                key={`trigger-${value}`}
            />
        );
    },
);

export const Content = forward<{ children: ReactNode; value: string }, 'div'>(
    ({ value, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getContentProps({ value })}
                ref={ref}
                key={`content-${value}`}
            />
        );
    },
);
