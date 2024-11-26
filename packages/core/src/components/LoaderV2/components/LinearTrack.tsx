import React from 'react';
import { useApi } from '../Loader';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const linearTrackClassName = tw`w-full`;

export const LinearTrack = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...api.getTrackProps()}
                className={linearTrackClassName}
                ref={ref}
                {...rest}
            >
                {children}
            </styled.div>
        );
    },
    { memoize: true, displayName: 'LinearTrack' },
);
