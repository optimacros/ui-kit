import { ComponentProps, useEffect, useMemo } from 'react';
import { RootProvider, useApi } from './Context';
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

        const content = useMemo(() => {
            if (isFunction(children)) {
                return children(api);
            }

            return children;
        }, [children, api]);

        return (
            <styled.div
                ref={ref}
                className={rootContentClassName}
                data-scope="progress"
                data-part="root"
                {...rest}
            >
                {content}
            </styled.div>
        );
    },
    { memoize: true, displayName: 'RootContent' },
);
