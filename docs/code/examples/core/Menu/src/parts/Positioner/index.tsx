import { Portal } from '@zag-js/react';
import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

export type PositionerProps = { portalled?: boolean };

export const Positioner = forward<{ portalled?: boolean }, 'div'>(({ portalled, ...rest }, ref) => {
    const api = useApi();

    const positioner = <styled.div {...rest} {...api.getPositionerProps()} ref={ref} />;

    return portalled ? <Portal>{positioner}</Portal> : positioner;
});

export type SubMenuPositionerProps = PositionerProps;

export const SubMenuPositioner = forward<SubMenuPositionerProps, 'div'>((props, ref) => {
    return <Positioner {...props} ref={ref} data-tag="sub-menu" />;
});
