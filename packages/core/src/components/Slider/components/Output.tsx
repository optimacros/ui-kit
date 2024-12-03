import { forward, styled } from '@optimacros/ui-kit-store';
import { useApi } from './context';

export const Output = forward<{}, 'output'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.output {...props} ref={ref} {...api.getValueTextProps()}>
                <b>{api.value.join(' - ')}</b>
            </styled.output>
        );
    },
    {
        displayName: 'Output',
    },
);
