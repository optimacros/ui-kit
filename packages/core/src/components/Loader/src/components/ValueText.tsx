import React from 'react';
import { useApi } from './context';
import { forward, styled } from '@optimacros-ui/store';

export const ValueText = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} ref={ref} {...api.getValueTextProps()}>
                {`${api.value} / ${api.max} (${api.percentAsString})`}
            </styled.div>
        );
    },
    { displayName: 'ValueText' },
);
