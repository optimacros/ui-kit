import { ComponentProps, ReactNode, MouseEvent } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Portal } from '@zag-js/react';
import { Root, useApi } from './state';

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

    const { onPointerMove, onPointerLeave, ...restProps } = api.getTriggerProps();

    const apiProps2 = {
        ...restProps,

        // TODO: фз, мб придумать что...
        // Костыль для 3231 сценария
        // Получается так, что кнопки пагинации сменяются под курсором. На новой кнопке не срабатывает pointerMove и тултип не открывается
        onMouseEnter: (e: MouseEvent) => {
            onPointerMove({ ...e, pointerType: 'mouse' });
        },
        // Костыль для костыля - поинтерлив срабатывает позже мауслива (???) и маусентер не может открыть новый тултип т.к. еще открыт старый
        onMouseLeave: (e: MouseEvent) => {
            onPointerLeave({ ...e, pointerType: 'mouse' });
        },
        onPointerMove,
        onPointerLeave,
    };

    return (
        <styled.button {...rest} {...apiProps2} ref={ref}>
            {children}
        </styled.button>
    );
});

export interface Props extends ComponentProps<typeof Root> {}

export type { PositioningOptions, Placement } from '@zag-js/tooltip';
