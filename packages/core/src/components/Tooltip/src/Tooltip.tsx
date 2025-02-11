import { ComponentProps, ReactNode } from 'react';
import * as tooltip from '@zag-js/tooltip';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';

export const { useApi, Api, RootProvider, splitProps, useProxySelector, useSelector } =
    createReactApiStateContext<typeof tooltip, tooltip.Api>({
        id: 'Tooltip',
        machine: tooltip,
    });

export type RootProps = ComponentProps<typeof RootProvider>;

export const Root = forward<RootProps & { children: ReactNode }, 'div'>(
    ({ children, ...rest }, ref) => {
        const [context, props] = splitProps(rest);

        return (
            <RootProvider {...context}>
                <styled.div {...props} ref={ref} data-scope="menu" data-part="root">
                    {children}
                </styled.div>
            </RootProvider>
        );
    },
);

export const Content = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return (
        api.open && (
            <div {...api.getPositionerProps()}>
                <div {...api.getContentProps()}>{children}</div>
                <div {...api.getArrowProps()}>
                    <div {...api.getArrowTipProps()} />
                </div>
            </div>
        )
    );
};

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.button {...rest} {...api.getTriggerProps()} ref={ref}>
            {children}
        </styled.button>
    );
});

export interface Props extends ComponentProps<typeof Root> {}

export type { PositioningOptions, Placement } from '@zag-js/tooltip';
