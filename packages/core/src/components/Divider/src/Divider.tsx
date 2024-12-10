import { forward, styled } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';

export const Divider = forward<{ orientation?: Orientation }, 'hr'>(
    ({ orientation = Orientation.Horizontal, ...rest }, ref) => (
        <styled.hr
            {...rest}
            data-scope="divider"
            data-part="root"
            data-orientation={orientation}
            ref={ref}
        />
    ),
);
