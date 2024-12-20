import { forward, styled } from '@optimacros-ui/store';
import { RootProvider, useApi } from './context';

export const Root = forward<{ maxValue: number }, 'span'>(
    ({ defaultValue, maxValue, children, ...rest }, ref) => (
        <styled.span
            {...rest}
            ref={ref}
            data-scope="counter"
            data-part="root"
            data-value={children ? 'full' : 'empty'}
        >
            <RootProvider defaultValue={defaultValue} maxValue={maxValue}>
                {children}
            </RootProvider>
        </styled.span>
    ),
);

export const Increase = forward<{}, 'span'>((props, ref) => {
    const { onIncrease } = useApi();

    return (
        <styled.span
            {...props}
            ref={ref}
            data-scope="counter"
            data-part="button"
            onClick={onIncrease}
        />
    );
});

export const Decrease = forward<{}, 'span'>((props, ref) => {
    const { onDecrease } = useApi();

    return (
        <styled.span
            {...props}
            ref={ref}
            data-scope="counter"
            data-part="decrease"
            onClick={onDecrease}
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
