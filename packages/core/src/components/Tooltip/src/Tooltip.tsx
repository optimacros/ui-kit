import { ComponentProps, ReactNode, MouseEvent, PointerEvent } from 'react';
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

    const { onPointerMove, ...restProps } = api.getTriggerProps();

    const apiProps2 = {
        ...restProps,

        // TODO: фз, мб придумать что...
        // Костыль для 3231 сценария
        // Получается так, что кнопки пагинации сменяются под курсором. На новой кнопке не срабатывает pointerMove и тултип не открывается
        onMouseEnter: (e: MouseEvent) => {
            onPointerMove({ ...e, pointerType: 'mouse' });
        },
        onPointerMove: (e: PointerEvent) => {
            if (e.pointerType === 'mouse') {
                return;
            }

            onPointerMove(e);
        },
    };

    return (
        <styled.button {...rest} {...apiProps2} ref={ref}>
            {children}
        </styled.button>
    );
});

export interface Props extends ComponentProps<typeof Root> {}

export type { PositioningOptions, Placement } from '@zag-js/tooltip';
