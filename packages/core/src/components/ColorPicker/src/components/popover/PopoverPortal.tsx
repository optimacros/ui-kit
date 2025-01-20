import { forward } from '@optimacros-ui/store';
import { PropsWithChildren } from 'react';
import { useApi } from '../../exports';
import { Portal } from '@zag-js/react';

export const PopoverPortal = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <Portal>
                <div {...rest} ref={ref} {...api.getPositionerProps()}>
                    <div {...api.getContentProps()}>
                        <div>{children}</div>
                    </div>
                </div>
            </Portal>
        );
    },
    { displayName: 'PopoverPortal' },
);
