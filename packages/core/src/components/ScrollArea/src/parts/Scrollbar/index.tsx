import { forward, styled } from '@optimacros-ui/store';

export const Scrollbar = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    return (
        <styled.div data-scope="scroll" data-part="scrollbar" ref={ref} {...rest}>
            {children}
        </styled.div>
    );
});
