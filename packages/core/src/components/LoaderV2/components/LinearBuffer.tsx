import { useApi } from './Context';
import { forward, styled } from '@optimacros/ui-kit-store';

interface Props {
    buffer: number;
}

export const LinearBuffer = forward<Props, 'div'>(
    ({ buffer, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...api.getRangeProps()}
                data-part="buffer"
                style={{ width: `${buffer}%` }}
                ref={ref}
                {...rest}
            />
        );
    },
    { displayName: 'LinearBuffer' },
);
