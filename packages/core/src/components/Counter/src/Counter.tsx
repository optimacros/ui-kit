import { forward, styled } from '@optimacros-ui/store';
import { CounterProps, RootProvider, useApi } from './context';

export const Root = forward<CounterProps, 'span'>(
    ({ defaultValue, maxValue, step, children, ...rest }, ref) => (
        <styled.span
            {...rest}
            ref={ref}
            data-scope="counter"
            data-part="root"
            data-value={children ? 'full' : 'empty'}
        >
            <RootProvider defaultValue={defaultValue} maxValue={maxValue} step={step}>
                {children}
            </RootProvider>
        </styled.span>
    ),
);

export const Increase = forward<{}, 'span'>((props, ref) => {
    const { increase } = useApi();

    return (
        <styled.span
            {...props}
            ref={ref}
            data-scope="counter"
            data-part="button"
            onClick={increase}
        />
    );
});

export const Decrease = forward<{}, 'span'>((props, ref) => {
    const { decrease } = useApi();

    return (
        <styled.span
            {...props}
            ref={ref}
            data-scope="counter"
            data-part="decrease"
            onClick={decrease}
        />
    );
});

export const Value = forward<{}, 'span'>((props, ref) => {
    const { value } = useApi();

    return (
        <styled.span {...props} ref={ref} data-scope="counter" data-part="value">
            {value}
        </styled.span>
    );
});
