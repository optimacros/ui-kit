import { Popover } from '.';
import { Button } from '@optimacros-ui/button';
import { Meta } from '@storybook/react';

export default {
    title: 'UI Kit core/Popover',
    component: Popover.Root,
    tags: ['autodocs'],
} as Meta;

export const Base = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button variant="bordered">Click me</Button>
            </Popover.Trigger>
            <Popover.Positioner>
                <Popover.Content>
                    <Popover.Title> Title </Popover.Title>
                    <Popover.Description> Description </Popover.Description>
                    <Popover.CloseTrigger asChild>
                        <Button variant="accent">Close</Button>
                    </Popover.CloseTrigger>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    );
};
