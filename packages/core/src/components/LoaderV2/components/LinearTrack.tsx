import React, { memo } from 'react';
import { useApi } from '../Loader';
import { tw } from '@optimacros/ui-kit-utils';

export const linearTrackClassName = tw`w-full`;

export const LinearTrack = memo<React.PropsWithChildren>(({ children }) => {
    const api = useApi();

    return (
        <div {...api.getTrackProps()} className={linearTrackClassName}>
            {children}
        </div>
    );
});
