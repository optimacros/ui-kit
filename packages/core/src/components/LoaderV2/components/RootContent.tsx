import { ComponentProps, useEffect } from 'react';
import { RootProvider, useApi } from './context';
import { Props as RootProps } from './Root';
import { isFunction, tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const rootContentClassName = tw`flex items-center flex-col w-full`;

type Props = ComponentProps<typeof RootProvider> & Pick<RootProps, 'value'>;

export const RootContent = forward<Props, 'div'>(
    ({ children, value, ...rest }, ref) => {
        const api = useApi();

        useEffect(() => {
            api.setValue(value);
        }, [value, api.setValue]);

        return (
            <styled.div
                ref={ref}
                className={rootContentClassName}
                data-scope="progress"
                data-part="root"
                {...rest}
            >
                {isFunction(children) ? children(api) : children}
            </styled.div>
        );
    },
    { displayName: 'RootContent' },
);
