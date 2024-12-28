import { forward, styled } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';

export const Divider = forward<{ orientation?: Orientation; fluid?: boolean }, 'hr'>(
    ({ orientation = Orientation.Horizontal, fluid, ...rest }, ref) => (
        <styled.hr
            {...rest}
            data-scope="divider"
            data-part="root"
            data-orientation={orientation}
            data-fluid={fluid}
            ref={ref}
        />
    ),
);
