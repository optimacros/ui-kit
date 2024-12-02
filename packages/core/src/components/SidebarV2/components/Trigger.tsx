import { forward, styled } from '@optimacros/ui-kit-store';
import { Icon } from '../../Icon';
import { tw } from '@optimacros/ui-kit-utils';

export const triggerClassName = tw`transition-all text-[var(--text)] hover:text-[var(--text-hover)] size-[var(--size)] flex items-center justify-center`;

export const Trigger = forward<{}, 'div'>(
    (props, ref) => {
        return (
            <styled.div
                {...props}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="trigger"
                ref={ref}
                className={triggerClassName}
            >
                <Icon value="keyboard-double-arrow-left" />
            </styled.div>
        );
    },
    { displayName: 'Trigger' },
);
