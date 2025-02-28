import { ComponentProps } from 'react';
import { Toggle } from '..';
import { Button } from '@optimacros-ui/button';

export const Basic = (props: ComponentProps<typeof Toggle>) => (
    <Toggle {...props}>
        <Button>Click me</Button>
    </Toggle>
);
