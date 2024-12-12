import { useEffect } from 'react';
import { useApi } from './context';
import { Props as RootProps } from './Root';
import { isFunction } from '@optimacros-ui/utils';
import { forward, styled } from '@optimacros-ui/store';

type Props = Pick<RootProps, 'value' | 'children'>;

export const RootContent = forward<Props, 'div'>(
    ({ children, value, ...rest }, ref) => {
        const api = useApi();

        useEffect(() => {
            api.setValue(value);
        }, [value, api.setValue]);

        return (
            <styled.div ref={ref} data-scope="progress" data-part="root" {...rest}>
                {isFunction(children) ? children(api) : children}
            </styled.div>
        );
    },
    { displayName: 'RootContent' },
);
