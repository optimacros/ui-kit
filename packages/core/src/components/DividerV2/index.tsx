import { forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import { Orientation } from '../../constants';

const dividerClassNames = tw`inline-flex m-0 p-0 border-none bg-dark-divider translate-y-px`;
export const Divider = forward<{ orientation?: Orientation }, 'hr'>(
    ({ orientation = Orientation.Horizontal, ...rest }, ref) => (
        <styled.hr
            {...rest}
            data-scope="divider"
            data-part="root"
            data-orientation={orientation}
            ref={ref}
            className={dividerClassNames}
        />
    ),
);
