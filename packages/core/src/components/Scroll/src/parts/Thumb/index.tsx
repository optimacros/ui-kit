import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../store/context';
import { Orientation } from '@optimacros-ui/utils';

export const Thumb = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const { thumbHeight, thumbTop, orientation } = useApi();
    const thumbPosition =
        orientation === Orientation.Vertical
            ? {
                  top: `${thumbTop}px`,
                  height: `${thumbHeight}px`,
              }
            : {
                  left: `${thumbTop}px`,
                  width: `${thumbHeight}px`,
              };

    return (
        <styled.div data-scope="scroll" data-part="thumb" ref={ref} {...rest} style={thumbPosition}>
            {children}
        </styled.div>
    );
});
