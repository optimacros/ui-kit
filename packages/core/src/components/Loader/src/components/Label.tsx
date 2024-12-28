import React from 'react';
import { useApi } from './context';
import { forward, styled } from '@optimacros-ui/store';

export const Label = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getLabelProps()} ref={ref}>
                <styled.div data-scope="progress" data-part="label-container">
                    {children}
                </styled.div>
            </styled.div>
        );
    },
    { displayName: 'Label' },
);
