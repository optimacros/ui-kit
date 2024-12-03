import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren } from 'react';
import { useApi } from './context';

export const rangeClassName = tw`h-full rounded-full 
bg-[var(--bg)] data-disabled:bg-[var(--bg-disabled)]`;

export const Range = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div {...props} {...api.getRangeProps()} className={rangeClassName} ref={ref} />
        );
    },
    {
        displayName: 'Range',
    },
);
