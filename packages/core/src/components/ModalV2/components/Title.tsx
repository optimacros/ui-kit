import { forward, styled } from '@optimacros/ui-kit-store';
import { useApi } from '../Modal';
import { tw } from '@optimacros/ui-kit-utils';
import React from 'react';

export const titleClassName = tw`text-[var(--color-text)] m-0 text-xl font-[var(--font-weight-bold)] truncate`;

export const Title = forward<React.PropsWithChildren, 'h3'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.h3
                {...api.getTitleProps()}
                ref={ref}
                {...props}
                className={titleClassName}
                data-part="title"
            />
        );
    },
    {
        displayName: 'Title',
    },
);
