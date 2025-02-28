import { forward, styled } from '@optimacros-ui/store';
import { ResizableBox, type ResizableProps } from 'react-resizable';
import 'node_modules/react-resizable/css/styles.css';

export const Root = forward<ResizableProps, 'div'>(({ children, ...rest }, ref) => {
    return (
        <styled.div data-scope="resizable" data-part="root" ref={ref}>
            <ResizableBox {...rest}>{children}</ResizableBox>
        </styled.div>
    );
});
