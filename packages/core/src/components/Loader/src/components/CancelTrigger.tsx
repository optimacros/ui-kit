import type React from 'react';
import { useApi } from './context';
import { forward, styled } from '@optimacros-ui/store';

export const CancelTrigger = forward<React.PropsWithChildren, 'button'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.button ref={ref} data-part="cancel-trigger" {...rest} onClick={api.stop}>
                {children}
            </styled.button>
        );
    },
    { displayName: 'CancelTrigger' },
);

export const FloatingCancelTrigger = forward<React.PropsWithChildren, 'button'>(
    (props, ref) => <CancelTrigger {...props} ref={ref} data-state="floating" />,
    { displayName: 'FloatingCancelTrigger' },
);
