import type React from 'react';
import { useApi } from '../context';
import { forward, styled } from '@optimacros-ui/store';

export const LinearTrack = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getTrackProps()} ref={ref}>
                {children}
            </styled.div>
        );
    },
    { displayName: 'LinearTrack' },
);
