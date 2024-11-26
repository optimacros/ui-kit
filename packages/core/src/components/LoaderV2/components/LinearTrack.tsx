import React, { memo } from 'react';
import { useApi } from '../Loader';

export const LinearTrack = memo<React.PropsWithChildren>(({ children }) => {
    const api = useApi();

    return <div {...api.getTrackProps()}>{children}</div>;
});
