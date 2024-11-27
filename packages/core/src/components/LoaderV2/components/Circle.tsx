import React from 'react';
import { useApi } from './Context';
import { forward, styled } from '@optimacros/ui-kit-store';

export const Circle = forward<React.PropsWithChildren, 'svg'>(
    (props, ref) => {
        const api = useApi();

        return <styled.svg {...api.getCircleProps()} {...props} ref={ref} />;
    },
    { memoize: true, displayName: 'Circle' },
);
