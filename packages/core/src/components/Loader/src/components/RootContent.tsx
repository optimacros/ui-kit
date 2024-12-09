import { useEffect } from 'react';
import { useApi } from './context';
import { Props as RootProps } from './Root';
import { isFunction, tw } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';

export const rootContentClassName = tw`relative flex items-center flex-col w-full`;

type Props = Pick<RootProps, 'value' | 'children'>;

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
