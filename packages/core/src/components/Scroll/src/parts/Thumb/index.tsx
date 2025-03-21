import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../store/context';
import { Orientation } from '@optimacros-ui/utils';

export const Thumb = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const { thumbSize, thumbOffset, orientation } = useApi();
    const thumbPosition =
        orientation === Orientation.Vertical
            ? {
                  top: `${thumbOffset}px`,
                  height: `${thumbSize}px`,
              }
            : {
                  left: `${thumbOffset}px`,
                  width: `${thumbSize}px`,
              };

    return (
        <styled.div data-scope="scroll" data-part="thumb" ref={ref} {...rest} style={thumbPosition}>
            {children}
        </styled.div>
    );
});
