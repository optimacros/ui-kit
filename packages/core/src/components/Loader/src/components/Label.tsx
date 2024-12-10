import React from 'react';
import { useApi } from './context';
import { tw } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';

export const labelClassName = tw`flex justify-center mb-2.5 max-w-full`;
export const labelContainerClassName = tw`truncate`;

export const Label = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getLabelProps()} className={labelClassName} ref={ref}>
                <styled.div
                    className={labelContainerClassName}
                    data-scope="progress"
                    data-part="label-container"
                >
                    {children}
                </styled.div>
            </styled.div>
        );
    },
    { displayName: 'Label' },
);
