import { forward, styled } from '@optimacros-ui/store';

export type CounterProps = {
    value: number;
    maxValue?: number;
};

export const Counter = forward<CounterProps, 'span'>(
    ({ value, maxValue = Infinity, ...rest }, ref) => (
        <styled.span
            {...rest}
            ref={ref}
            data-scope="counter"
            data-part="root"
            data-value={value ? 'full' : 'empty'}
        >
            {value}
        </styled.span>
    ),
);
