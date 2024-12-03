import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren } from 'react';
import { useApi } from './context';

export const trackClassName = tw`h-[var(--height)] flex-1 bg-[var(--bg)] rounded-full`;

export const Track = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div {...props} {...api.getTrackProps()} className={trackClassName} ref={ref} />
        );
    },
    {
        displayName: 'Track',
    },
);
