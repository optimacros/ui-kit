import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../store/context';

export const Viewport = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const { viewportRef } = useApi();

    return (
        <styled.div data-scope="scroll" data-part="viewport" ref={viewportRef} {...rest} style={{}}>
            {children}
        </styled.div>
    );
});
