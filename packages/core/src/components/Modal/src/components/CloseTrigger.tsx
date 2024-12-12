import { forward, styled } from '@optimacros-ui/store';
import React, { useCallback } from 'react';
import { useApi } from './context';

export const CloseTrigger = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        const handleClick = useCallback(() => {
            api.setOpen(false);
        }, [api.setOpen]);

        return (
            <styled.div
                ref={ref}
                {...rest}
                data-scope="dialog"
                data-part="close-trigger"
                onClick={handleClick}
            >
                {children}
            </styled.div>
        );
    },
    {
        displayName: 'CloseTrigger',
    },
);
