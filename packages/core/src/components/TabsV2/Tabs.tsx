import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import * as tabs from '@zag-js/tabs';
import { tw, isVisibleInParentViewport, filter, useEventListener } from '@optimacros/ui-kit-utils';
import { ReactNode, RefObject, useState } from 'react';
import { Menu as BaseMenu } from '../MenuV2';

export const rootClassName = tw``;
export const { Api, Provider, Root, useApi } = createReactApiStateContext({
    api: null as tabs.Api,
    id: 'tabs',
    machine: tabs,
    initialState: null,
    rootAsTag: true,
    defaultContext: {},
    useExtendApi(state, api) {
        const getListNode = () => {
            const list = api.getListProps();
            const containerNode = document.getElementById(list.id);

            return containerNode;
        };

        const scrollTo = (value: string) => {
            const tab = api.getTriggerProps({ value });

            api.send({ type: 'TAB_FOCUS', value });

            document.getElementById(tab.id).scrollIntoView();
        };

        const open = (value?: string) => {
            if (value) {
                scrollTo(value);

                api.setValue(value);
            } else {
                api.send('ENTER');
            }
        };

        const getHiddenTabs = () => {
            const containerNode = getListNode();

            return filter(
                containerNode?.children,
                (element, index) => !isVisibleInParentViewport(containerNode, element),
            ).map((element, i, arr) => {
                const value = element.getAttribute('data-value');

                return {
                    value,
                    onClickCapture: () => open(value),
                };
            });
        };

        const last = () => api.send('END');

        const first = () => api.send('HOME');

        const scrollToActive = () => scrollTo(api.value);

        return {
            ...api,
            scrollTo,
            open,
            getHiddenTabs,
            scrollToActive,
            last,
            first,
        };
    },

    useRootProps(api) {
        return {
            ...api.getRootProps(),
            className: rootClassName,
        };
    },
});

export const listClassName = 'flex relative z-1 overflow-scroll';
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

export function useHiddenTabs(ref: RefObject<HTMLUListElement>) {
    const api = useApi();
    const [tabs, setTabs] = useState([]);
    1;
    useEventListener(
        'scroll',
        () => {
            setTabs(() => api.getHiddenTabs());
        },
        ref,
    );

    return tabs;
}

export const Menu = BaseMenu;

export const HiddenTabsList = forward<
    { children: (tab: { value: string; disabled: boolean; onClick: any }) => any },
    'ul'
>(({ children }, ref) => {
    const hiddenTabs = useHiddenTabs(ref);

    return hiddenTabs.map(children);
});
