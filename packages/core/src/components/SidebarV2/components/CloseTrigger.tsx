import { forward, styled } from '@optimacros/ui-kit-store';
import { Icon } from '../../Icon';
import { tw } from '@optimacros/ui-kit-utils';

export const closeTriggerClassName = tw`transition-all text-[var(--color)] hover:text-[var(--color-hover)] size-[var(--size)] flex items-center justify-center cursor-pointer`;

export const CloseTrigger = forward<{}, 'div'>(
    (props, ref) => {
        return (
            <styled.div
                {...props}
                data-tag="sidebar"
                data-scope="collapsible"
                data-part="close-trigger"
                ref={ref}
                className={closeTriggerClassName}
            >
                <Icon value="keyboard-double-arrow-right" />
            </styled.div>
        );
    },
    { displayName: 'CloseTrigger' },
);
