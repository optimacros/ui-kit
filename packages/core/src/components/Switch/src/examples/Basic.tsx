import { ComponentProps } from 'react';
import { Switch } from '..';

export const Basic = (props: ComponentProps<typeof Switch.Root>) => (
    <Switch.Root {...props}>
        <Switch.Control data-testid="control">
            <Switch.Thumb data-testid="thumb" />
        </Switch.Control>
        <Switch.Label>Label</Switch.Label>
    </Switch.Root>
);
