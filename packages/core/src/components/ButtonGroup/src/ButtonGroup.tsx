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

export const Item = forward<{ active?: boolean }, 'button'>(({ active = false, ...rest }, ref) => (
    <styled.button
        {...rest}
        ref={ref}
        data-active={active}
        data-scope="button-group"
        data-part="item"
    />
));
