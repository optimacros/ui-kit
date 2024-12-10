import React from 'react';
import { useApi } from './context';
import { forward, styled } from '@optimacros-ui/store';
import { tw, clsx } from '@optimacros-ui/utils';

export const cancelTriggerClassName = tw`flex cursor-pointer transition`;

export const CancelTrigger = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                className={cancelTriggerClassName}
                ref={ref}
                data-part="cancel-trigger"
                {...rest}
                onClick={api.onCancel}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'CancelTrigger' },
);

export const floatingCncelTriggerClassName = clsx(cancelTriggerClassName, tw`absolute right-0`);

export const FloatingCancelTrigger = forward<React.PropsWithChildren, 'div'>(
    (props, ref) => (
        <CancelTrigger
            {...props}
            className={floatingCncelTriggerClassName}
            ref={ref}
            data-state="floating"
        />
    ),
    { displayName: 'FloatingCancelTrigger' },
);
