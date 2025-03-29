import { forward } from '@optimacros-ui/store';
import { PropsWithChildren } from 'react';
import { useApi } from '../../exports';
import { Portal } from '@zag-js/react';

export const PopoverPortal = forward<PropsWithChildren & { portalled?: boolean }, 'div'>(
    ({ children, portalled, ...rest }, ref) => {
        const api = useApi();
        const Component = (
            <div {...rest} ref={ref} {...api.getPositionerProps()}>
                <div {...api.getContentProps()}>
                    <div>{children}</div>
                </div>
            </div>
        );
        return portalled ? <Portal>{Component}</Portal> : Component;
    },
    { displayName: 'PopoverPortal' },
);
