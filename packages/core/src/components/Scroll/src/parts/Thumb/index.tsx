import { forward, styled } from '@optimacros-ui/store';

export const Thumb = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    return (
        <styled.div data-scope="scroll" data-part="thumb" ref={ref} {...rest}>
            {children}
        </styled.div>
    );
});
