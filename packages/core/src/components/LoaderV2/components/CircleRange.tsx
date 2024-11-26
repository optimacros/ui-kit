import { useApi } from '../Loader';
import { forward, styled } from '@optimacros/ui-kit-store';

export const CircleRange = forward<any, 'circle'>(
    (props, ref) => {
        const api = useApi();

        return <styled.circle {...api.getCircleRangeProps()} ref={ref} {...props} />;
    },
    { memoize: true, displayName: 'CircleRange' },
);
