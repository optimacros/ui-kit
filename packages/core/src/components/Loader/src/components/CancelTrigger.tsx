import React from 'react';
import { useApi } from './context';
import { forward, styled } from '@optimacros-ui/store';

export const CancelTrigger = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div ref={ref} data-part="cancel-trigger" {...rest} onClick={api.onCancel}>
                {children}
            </styled.div>
        );
    },
    { displayName: 'CancelTrigger' },
);

export const FloatingCancelTrigger = forward<React.PropsWithChildren, 'div'>(
    (props, ref) => <CancelTrigger {...props} ref={ref} data-state="floating" />,
    { displayName: 'FloatingCancelTrigger' },
);
