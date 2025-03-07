import { Tooltip } from '..';
import { Button } from '@optimacros-ui/button';

export const Basic = (props: Tooltip.RootProps) => {
    return (
        <Tooltip.Root {...props}>
            <Tooltip.Trigger asChild data-testid="trigger">
                <Button variant="bordered">hover over me</Button>
            </Tooltip.Trigger>
            <Tooltip.Content data-testid="content">here we are</Tooltip.Content>
        </Tooltip.Root>
    );
};
