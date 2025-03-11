import { forward, styled } from '@optimacros-ui/store';

export const Viewport = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    return (
        <styled.div data-scope="scroll" data-part="viewport" ref={ref} {...rest}>
            {children}
        </styled.div>
    );
});
