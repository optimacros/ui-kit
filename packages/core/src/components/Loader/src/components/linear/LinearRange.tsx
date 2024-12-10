import { tw } from '@optimacros-ui/utils';
import { useApi } from '../context';
import { forward, styled } from '@optimacros-ui/store';

export const linearRangeClassName = tw`w-full bg-[var(--bg)]`;

export const LinearRange = forward<{}, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...props}
                {...api.getRangeProps()}
                ref={ref}
                className={linearRangeClassName}
            />
        );
    },
    { displayName: 'LinearRange' },
);
