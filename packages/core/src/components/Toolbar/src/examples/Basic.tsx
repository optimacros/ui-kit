import { Button } from '@optimacros-ui/button';
import { Toolbar } from '../';
import { ComponentProps } from 'react';

export const Basic = (props: ComponentProps<typeof Toolbar.Root>) => (
    <Toolbar.Root {...props}>
        <Button variant="accent"> Cancel </Button>
        <Button variant="primary"> Submit </Button>
    </Toolbar.Root>
);
