import { forward, styled } from '@optimacros-ui/store';
import { useApi } from './context';
import React from 'react';

export const Title = forward<React.PropsWithChildren, 'h3'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.h3
                {...api.getTitleProps()}
                ref={ref}
                {...props}
                data-scope="dialog"
                data-part="title"
            />
        );
    },
    {
        displayName: 'Title',
    },
);
