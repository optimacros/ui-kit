import { useApi } from './Context';
import { forward, styled } from '@optimacros/ui-kit-store';

export const LinearRange = forward<any, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...api.getRangeProps()} ref={ref} {...props} />;
    },
    { memoize: true, displayName: 'LinearRange' },
);
