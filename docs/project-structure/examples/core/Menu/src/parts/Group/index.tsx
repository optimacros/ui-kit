import { forward, styled } from '@optimacros-ui/store';
import { ItemGroupLabelProps, ItemGroupProps } from '@zag-js/menu';
import { ReactNode } from 'react';
import { useApi } from '../../state';

export type GroupProps = ItemGroupProps & { children: ReactNode };

export const Group = forward<GroupProps, 'ul'>(({ children, id, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.ul
            ref={ref}
            {...rest}
            {...api.getItemGroupProps({ id })}
            data-orientation={api.orientation}
        >
            {children}
        </styled.ul>
    );
});

export type GroupLabelProps = ItemGroupLabelProps & { children: ReactNode };

export const GroupLabel = forward<GroupLabelProps, 'label'>(
    ({ children, htmlFor, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.label {...rest} ref={ref} {...api.getItemGroupLabelProps({ htmlFor })}>
                {children}
            </styled.label>
        );
    },
);
