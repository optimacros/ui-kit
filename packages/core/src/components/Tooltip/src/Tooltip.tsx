import { ComponentProps, ReactNode } from 'react';
import * as tooltip from '@zag-js/tooltip';
import { createMachineContext, forward, styled, Zag } from '@optimacros-ui/store';
import { Portal } from '@zag-js/react';

export type Schema = Zag.ModuleSchema<typeof tooltip>;

export const {
    useApi,
    Api,
    RootProvider: Root,
    splitProps,
    useProxySelector,
    useSelector,
    State,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, tooltip.Api>({
    id: 'Tooltip',
    machine: tooltip,
});

export type RootProps = ComponentProps<typeof Root>;

export const Content = ({
    children,
    as,
    className,
    portalled,
    ...rest
}: { children: ReactNode; as?: string; className?: string; portalled?: boolean }) => {
    const api = useApi();
    const Component = api.open && (
        <styled.div {...api.getPositionerProps()} {...rest}>
            <styled.div {...api.getContentProps()} className={className}>
                {children}
            </styled.div>
            <styled.div {...api.getArrowProps()}>
                <styled.div {...api.getArrowTipProps()} />
            </styled.div>
        </styled.div>
    );

    return portalled ? <Portal>{Component}</Portal> : Component;
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
