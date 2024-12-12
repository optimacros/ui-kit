import { useApi } from '../context';
import { forward, styled } from '@optimacros-ui/store';

interface Props {
    buffer: number;
}

export const LinearBuffer = forward<Props, 'div'>(
    ({ buffer, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getRangeProps()}
                data-part="buffer"
                style={{ width: `${buffer}%` }}
                ref={ref}
            />
        );
    },
    { displayName: 'LinearBuffer' },
);
