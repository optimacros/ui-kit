import { forward, styled } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';

export const Root = forward<{ orientation: Orientation }, 'div'>(
    ({ orientation = Orientation.Horizontal, ...rest }, ref) => (
        <styled.div
            {...rest}
            ref={ref}
            data-scope="button-group"
            data-part="root"
            data-orientation={orientation}
        />
    ),
);

export const Item = forward<{}, 'button'>((props, ref) => (
    <styled.button {...props} ref={ref} data-scope="button-group" data-part="item" />
));
