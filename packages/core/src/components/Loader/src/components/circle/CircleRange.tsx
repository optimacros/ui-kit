import { useApi } from '../context';
import { forward, styled } from '@optimacros-ui/store';

export const CircleRange = forward<{}, 'circle'>(
    (props, ref) => {
        const api = useApi();

        return <styled.circle {...props} {...api.getCircleRangeProps()} ref={ref} />;
    },
    { displayName: 'CircleRange' },
);
