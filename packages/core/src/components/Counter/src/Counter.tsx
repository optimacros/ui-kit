import { forward, styled } from '@optimacros-ui/store';
import { tw } from '@optimacros-ui/utils';

export type CounterProps = {
    value: number;
    maxValue?: number;
};

export const rootClassName = tw`flex items-center justify-center rounded-sm p-0.5 ml-1.5 text-xs text-counter-text t bg-counter
data-[value=empty]:min-h-[10px]
data-[value=empty]:min-w-[10px]
data-[value=empty]:rounded-full
data-[value=full]:min-w-[20px]
`;

export const Counter = forward<CounterProps, 'span'>(
    ({ value, maxValue = Infinity, ...rest }, ref) => (
        <styled.span
            {...rest}
            ref={ref}
            data-scope="counter"
            data-part="root"
            data-value={value ? 'full' : 'empty'}
            className={rootClassName}
        >
            {value}
        </styled.span>
    ),
);
