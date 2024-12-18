import { forward, styled } from '@optimacros-ui/store';

export const Root = forward<{}, 'span'>(({ children, ...rest }, ref) => (
    <styled.span
        {...rest}
        ref={ref}
        data-scope="counter"
        data-part="root"
        data-value={children ? 'full' : 'empty'}
    >
        {children}
    </styled.span>
));

export const Button = forward<{}, 'span'>((props, ref) => (
    <styled.span {...props} ref={ref} data-scope="counter" data-part="button" />
));
