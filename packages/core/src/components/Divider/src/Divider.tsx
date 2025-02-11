import { forward, styled } from '@optimacros-ui/store';
import { Orientation } from '@optimacros-ui/utils';
import { ComponentProps } from 'react';

interface Props {
    orientation?: Orientation;
    fluid?: boolean;
}

export type DividerProps = ComponentProps<typeof Divider>;

export const Divider = forward<Props, 'hr'>(
    ({ orientation = Orientation.Horizontal, fluid, ...rest }, ref) => {
        const getProps = () => {
            const p = {
                ...rest,
                'data-scope': 'divider',
                'data-part': 'root',
                'data-orientation': orientation,
                ref,
            };

            if (fluid) {
                p['data-fluid'] = true;
            }

            return p;
        };

        return <styled.hr {...getProps()} />;
    },
    { memoize: true, displayName: 'Divider' },
);
