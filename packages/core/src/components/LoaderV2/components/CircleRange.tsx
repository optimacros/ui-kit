import { memo } from 'react';
import { useApi } from '../Loader';

export const CircleRange = memo(() => {
    const api = useApi();

    return <circle {...api.getCircleRangeProps()} />;
});
