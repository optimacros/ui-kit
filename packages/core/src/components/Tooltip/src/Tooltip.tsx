import { ComponentProps, ReactNode } from 'react';
import * as tooltip from '@zag-js/tooltip';
import { createMachineContext, forward, styled, Zag } from '@optimacros-ui/store';

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
    ...rest
}: { children: ReactNode; as: string; className: string }) => {
    const api = useApi();

    return (
        api.open && (
            <div {...api.getPositionerProps()} {...rest}>
                <div {...api.getContentProps()}>
                    <span className={className}>{children}</span>
                </div>
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
