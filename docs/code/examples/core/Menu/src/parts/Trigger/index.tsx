import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';
import { ReactNode } from 'react';

export type TriggerProps = { children: ReactNode };

export const Trigger = forward<TriggerProps, 'button'>(({ children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.button {...rest} {...api.getTriggerProps()} ref={ref} role="button">
            {children}
        </styled.button>
    );
});
