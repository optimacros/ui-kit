import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../store/context';

export const Thumb = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const { thumbHeight, thumbTop } = useApi();

    return (
        <styled.div
            data-scope="scroll"
            data-part="thumb"
            ref={ref}
            {...rest}
            style={{
                top: `${thumbTop}px`,
                height: `${thumbHeight}px`,
            }}
        >
            {children}
        </styled.div>
    );
});
