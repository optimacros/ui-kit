import { forward, styled } from '@optimacros-ui/store';
import { Provider } from '../../store/context';
import './styles.css';

export const Root = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    return (
        <Provider>
            <styled.div data-scope="scroll" data-part="root" ref={ref} {...rest}>
                {children}
            </styled.div>
        </Provider>
    );
});
