import { memo } from 'react';
import { useApi } from '../Loader';

export const CircleTrack = memo(() => {
    const api = useApi();

    return <circle {...api.getCircleTrackProps()} />;
});
