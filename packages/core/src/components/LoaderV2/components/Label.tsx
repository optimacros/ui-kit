import React from 'react';
import { useApi } from './Context';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const labelClassName = tw`flex justify-center mb-2.5 max-w-full`;
export const labelContainerClassName = tw`truncate`;

export const Label = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...api.getLabelProps()} className={labelClassName} ref={ref} {...rest}>
                <styled.div className={labelContainerClassName}>{children}</styled.div>
            </styled.div>
        );
    },
    { memoize: true, displayName: 'Label' },
);
