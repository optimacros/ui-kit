import { forward } from '@optimacros/ui-kit-store';
import { useApi } from './context';
import { tw } from '@optimacros/ui-kit-utils';

export const backdropClassName = tw`fixed z-[var(--z)] inset-0 bg-[var(--bg)]`;

export const Output = forward<{}, 'output'>(
    (props, ref) => {
        const api = useApi();

        return (
            <output {...props} ref={ref} {...api.getValueTextProps()}>
                <b>{api.value.join(' - ')}</b>
            </output>
        );
    },
    {
        displayName: 'Output',
    },
);
