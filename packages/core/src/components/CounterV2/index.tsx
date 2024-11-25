import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';

export type CounterProps = {
    value: number;
    maxValue?: number;
};

export const rootClassName = tw`flex items-center justify-center rounded-sm p-0.5 ml-1.5 text-xs text-counter-text t bg-counter`;
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
