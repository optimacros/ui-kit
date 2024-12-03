import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren } from 'react';
import { useApi } from './context';

export const controlClassName = tw`flex items-center relative mt-5

data-[orientation=horizontal]:py-2.5 data-[orientation=vertical]:px-2.5`;

export const Control = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...props}
                {...api.getControlProps()}
                className={controlClassName}
                ref={ref}
            />
        );
    },
    {
        displayName: 'Control',
    },
);
