import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { PropsWithChildren } from 'react';

export const infoContainerClassName = tw`flex justify-between space-x-2`;

export const InfoContainer = forward<PropsWithChildren, 'div'>(
    (props, ref) => <styled.div {...props} className={infoContainerClassName} ref={ref} />,
    {
        displayName: 'InfoContainer',
    },
);
