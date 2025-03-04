import { Tooltip } from '..';
import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';

export const ApiControlled = (props: Tooltip.RootProps) => {
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
                <Tooltip.Api>
                    {(api) => (
                        <>
                            <Button variant="bordered" onClick={() => api.setOpen(true)}>
                                click to open
                            </Button>

                            <Tooltip.Trigger asChild>
                                <Button variant="bordered">
                                    do not click or hover over
                                    <br />
                                    this will break everything
                                </Button>
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
                                    <Button variant="accent" onClick={() => api.setOpen(false)}>
                                        click to close
                                    </Button>
                                </Flex>
                            </Tooltip.Content>
                        </>
                    )}
                </Tooltip.Api>
            </Tooltip.Root>
        </Flex>
    );
};
