import { ComponentProps, useEffect, useMemo } from 'react';
import { BaseRoot, useApi, Props as RootProps } from '../Loader';
import { isFunction, tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export const rootContentClassName = tw`flex items-center flex-col w-full`;

type Props = ComponentProps<typeof BaseRoot> & Pick<RootProps, 'value' | 'disabled' | 'multicolor'>;

export const RootContent = forward<Props, 'div'>(
    ({ children, value, disabled, multicolor, ...rest }, ref) => {
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
                data-disabled={disabled}
                data-multicolor={multicolor}
                className={rootContentClassName}
                {...rest}
            >
                {content}
            </styled.div>
        );
    },
    { memoize: true, displayName: 'RootContent' },
);
