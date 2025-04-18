import type React from 'react';
import { useApi } from '../context';
import { forward, styled } from '@optimacros-ui/store';

export const Circle = forward<React.PropsWithChildren, 'svg'>(
    (props, ref) => {
        const api = useApi();

        return <styled.svg {...props} {...api.getCircleProps()} ref={ref} />;
    },
    { displayName: 'Circle' },
);
