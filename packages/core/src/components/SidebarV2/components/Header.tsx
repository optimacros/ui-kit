import { forward, styled } from '@optimacros/ui-kit-store';
import { PropsWithChildren } from 'react';
import { tw } from '@optimacros/ui-kit-utils';

export const headerClassName = tw`flex flex-row items-center
border-0 border-b border-solid border-[var(--border-bg)]

p-[var(--padding)]`;

export const Header = forward<PropsWithChildren, 'div'>(
    (props, ref) => (
        <styled.div
            {...props}
            ref={ref}
            className={headerClassName}
            data-tag="sidebar"
            data-scope="collapsible"
            data-part="header"
        />
    ),
    { displayName: 'Header' },
);
