import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import React from 'react';

export const headerClassName = tw`relative pl-6 pr-14 py-3.5 flex flex-row items-center w-full box-border`;

export const Header = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.div
                className={headerClassName}
                {...rest}
                ref={ref}
                data-scope="dialog"
                data-part="header"
            >
                {children}
            </styled.div>
        );
    },
    {
        displayName: 'Header',
    },
);
