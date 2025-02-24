import { ReactNode } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../state';

export type TriggerProps = { children: ReactNode };

export const Trigger = forward<TriggerProps, 'div'>(({ children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.div {...rest} {...api.getTriggerProps()} ref={ref}>
            {children}
        </styled.div>
    );
});
