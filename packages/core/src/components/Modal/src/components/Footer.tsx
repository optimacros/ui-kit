import { forward, styled } from '@optimacros-ui/store';
import React from 'react';

export const Footer = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div {...rest} ref={ref} data-part="footer" data-scope="dialog">
            {children}
        </styled.div>
    ),
    {
        displayName: 'Footer',
    },
);
