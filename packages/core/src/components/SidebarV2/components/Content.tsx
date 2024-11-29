import { forward, styled } from '@optimacros/ui-kit-store';
import { PropsWithChildren } from 'react';
import { tw } from '@optimacros/ui-kit-utils';

export const contentOuterClassName = tw`min-h-0 p-[var(--padding)]`;
export const contentInnerClassName = tw`scroll h-full`;

export const Content = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => (
        <styled.div
            {...rest}
            ref={ref}
            data-tag="sidebar"
            data-scope="collapsible"
            data-part="content-outer"
            className={contentOuterClassName}
        >
            <styled.div
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="content-inner"
                className={contentInnerClassName}
            >
                {children}
            </styled.div>
        </styled.div>
    ),
    { displayName: 'Content' },
);
