import { tw } from '@optimacros/ui-kit-utils';
import { useApi } from '../context';
import { forward, styled } from '@optimacros/ui-kit-store';

export const linearBufferClassName = tw`bg-gradient-to-r from-[var(--from)] to-[var(--to)]`;

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
                className={linearBufferClassName}
            />
        );
    },
    { displayName: 'LinearBuffer' },
);
