import React from 'react';
import { useApi } from '../context';
import { tw } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';

export const linearTrackClassName = tw`relative w-full bg-[var(--bg)]`;

export const LinearTrack = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getTrackProps()}
                className={linearTrackClassName}
                ref={ref}
            >
                {children}
            </styled.div>
        );
    },
    { displayName: 'LinearTrack' },
);