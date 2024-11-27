import { useApi } from './Context';
import { forward, styled } from '@optimacros/ui-kit-store';

export const CircleTrack = forward<any, 'circle'>(
    (props, ref) => {
        const api = useApi();

        return <styled.circle {...api.getCircleTrackProps()} ref={ref} {...props} />;
    },
    { displayName: 'CircleTrack' },
);
