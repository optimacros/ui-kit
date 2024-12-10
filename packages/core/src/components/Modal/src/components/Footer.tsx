import { forward, styled } from '@optimacros-ui/store';
import { tw } from '@optimacros-ui/utils';
import React from 'react';

export const footerClassName = tw`px-6 py-3.5 flex justify-end flex-row items-center w-full box-border`;

export const Footer = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div
            className={footerClassName}
            {...rest}
            ref={ref}
            data-part="footer"
            data-scope="dialog"
        >
            {children}
        </styled.div>
    ),
    {
        displayName: 'Footer',
    },
);
