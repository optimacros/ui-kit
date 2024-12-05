import { useApi } from '../context';
import { forward, styled } from '@optimacros/ui-kit-store';

export const CircleTrack = forward<{}, 'circle'>(
    (props, ref) => {
        const api = useApi();

        return <styled.circle {...props} {...api.getCircleTrackProps()} ref={ref} />;
    },
    { displayName: 'CircleTrack' },
);
