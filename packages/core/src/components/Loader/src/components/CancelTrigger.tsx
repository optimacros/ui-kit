import React from 'react';
import { useApi } from './context';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const cancelTriggerClassName = tw`flex cursor-pointer transition`;

export const CancelTrigger = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                className={cancelTriggerClassName}
                ref={ref}
                data-part="cancel-trigger"
                onClick={api.onCancel}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'CancelTrigger' },
);
