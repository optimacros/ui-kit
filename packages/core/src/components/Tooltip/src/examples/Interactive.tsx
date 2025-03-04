import { Tooltip } from '..';
import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';

export const Interactive = (props: Tooltip.RootProps) => {
    return (
        <Flex
            justify="center"
            align="center"
            style={{
                height: '20rem',
                width: '40rem',
            }}
        >
            <Tooltip.Root {...props}>
                <Tooltip.Trigger asChild data-testid="trigger">
                    <Button variant="bordered">hover over me</Button>
                </Tooltip.Trigger>

                <Tooltip.Content>
                    <Flex
                        justify="center"
                        align="center"
                        style={{
                            height: 100,
                            width: 200,
                            background: 'lightGray',
                        }}
                    >
                        <Button variant="accent" data-testid="content-button">
                            here we are
                        </Button>
                    </Flex>
                </Tooltip.Content>
            </Tooltip.Root>
        </Flex>
    );
};
