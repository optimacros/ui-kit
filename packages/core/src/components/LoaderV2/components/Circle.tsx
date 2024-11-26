import React, { memo } from 'react';
import { useApi } from '../Loader';

export const Circle = memo<React.PropsWithChildren>(({ children }) => {
    const api = useApi();

    return <svg {...api.getCircleProps()}>{children}</svg>;
});
