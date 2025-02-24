import { ComponentProps, ReactNode } from 'react';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as hoverCard from '@zag-js/hover-card';

export const {
    useApi,
    Api,
    RootProvider: Root,
    splitProps,
    useProxySelector,
    useSelector,
} = createReactApiStateContext<typeof hoverCard, hoverCard.Api>({
    id: 'hover-card',
    machine: hoverCard,
});

export type RootProps = ComponentProps<typeof Root>;

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.button {...rest} {...api.getTriggerProps()} ref={ref} role="button">
            {children}
        </styled.button>
    );
});
