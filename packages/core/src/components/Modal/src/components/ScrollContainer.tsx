import { forward, styled } from '@optimacros-ui/store';
import React from 'react';
import { tw } from '@optimacros-ui/utils';

export const scrollContainerOuterClassName = tw`flex pl-6 pr-2 w-full box-border overflow-hidden`;
export const scrollContainerInnerClassName = tw`scroll`;

export const ScrollContainer = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div
            className={scrollContainerOuterClassName}
            ref={ref}
            {...rest}
            data-scope="dialog"
            data-part="scroll-container-outer"
        >
            <styled.div
                className={scrollContainerInnerClassName}
                data-scope="dialog"
                data-part="scroll-container-inner"
            >
                {children}
            </styled.div>
        </styled.div>
    ),
    {
        displayName: 'ScrollContainer',
    },
);
