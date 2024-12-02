import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren } from 'react';

export const closeTriggerClassName = tw`text-[var(--text)] hover:text-[var(--text-hover)] size-[var(--size)] flex items-center justify-center`;

export const CloseTrigger = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.div
                {...rest}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="close-trigger"
                ref={ref}
                className={closeTriggerClassName}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'CloseTrigger' },
);
