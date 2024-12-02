import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren } from 'react';

export const triggerClassName = tw`transition-all text-[var(--text)] hover:text-[var(--text-hover)] size-[var(--size)] flex items-center justify-center`;

export const Trigger = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.div
                {...rest}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="trigger"
                ref={ref}
                className={triggerClassName}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'Trigger' },
);
