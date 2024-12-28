import { useApi } from '../context';
import { forward, styled } from '@optimacros-ui/store';

export const LinearRange = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getRangeProps()} ref={ref} />;
    },
    { displayName: 'LinearRange' },
);
