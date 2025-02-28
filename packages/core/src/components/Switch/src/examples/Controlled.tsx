import { ComponentProps, useState } from 'react';
import { Switch } from '..';

export const Controlled = (props: ComponentProps<typeof Switch.Root>) => {
    const [checked, setChecked] = useState(false);

    return (
        <Switch.Root
            {...props}
            checked={checked}
            onCheckedChange={({ checked }) => {
                setChecked(checked);
            }}
        >
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label>{checked ? 'Active' : 'Inactive'}</Switch.Label>
        </Switch.Root>
    );
};
