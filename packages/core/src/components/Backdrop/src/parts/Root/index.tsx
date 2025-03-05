import { forward, styled } from '@optimacros-ui/store';
import './styles.css';

export const Root = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    return (
        <styled.div data-scope="backdrop" data-part="root" ref={ref} {...rest}>
            {children}
        </styled.div>
    );
});
