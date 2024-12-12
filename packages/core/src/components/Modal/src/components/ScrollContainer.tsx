import { forward, styled } from '@optimacros-ui/store';
import React from 'react';

export const ScrollContainer = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div ref={ref} {...rest} data-scope="dialog" data-part="scroll-container-outer">
            <styled.div
                data-scope="dialog"
                data-part="scroll-container-inner"
                data-role="scroll-container"
            >
                {children}
            </styled.div>
        </styled.div>
    ),
    {
        displayName: 'ScrollContainer',
    },
);
