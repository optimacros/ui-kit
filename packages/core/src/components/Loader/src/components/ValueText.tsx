import React from 'react';
import { useApi } from './context';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const valueTextClassName = tw`absolute top-0 bottom-0 right-0 left-0 
flex items-center justify-center
text-[var(--color)]`;

export const ValueText = forward<React.PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        console.info(api);

        return (
            <styled.div
                {...rest}
                className={valueTextClassName}
                ref={ref}
                {...api.getValueTextProps()}
                data-part="value-text"
            >
                {`${api.value} / ${api.max} (${api.percentAsString})`}
            </styled.div>
        );
    },
    { displayName: 'ValueText' },
);
