import { forward } from '@optimacros/ui-kit-store';
import { PropsWithChildren } from 'react';
import { useApi } from './context';

export const Label = forward<PropsWithChildren, 'label'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
            <label {...rest} ref={ref} {...api.getLabelProps()}>
                {children}
            </label>
        );
    },
    {
        displayName: 'Label',
    },
);
