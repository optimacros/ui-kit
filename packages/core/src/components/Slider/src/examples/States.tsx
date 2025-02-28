import { Slider } from '@optimacros-ui/slider';
import { ComponentProps } from 'react';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';

export const States = (props: ComponentProps<typeof Slider.Root>) => {
    return (
        <Flex direction="column" gap={4}>
            <Flex direction="column" gap={2}>
                <Text.Title as="h3">Disabled</Text.Title>
                <Slider.Root {...props} disabled>
                    <Slider.Container>
                        <Flex>
                            <Slider.Label>Quantity:&nbsp;</Slider.Label>
                            <Slider.Output />
                        </Flex>

                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumb />
                        </Slider.Control>
                    </Slider.Container>
                </Slider.Root>
            </Flex>

            <Flex direction="column" gap={2}>
                <Text.Title as="h3">Invalid</Text.Title>
                <Slider.Root {...props} invalid>
                    <Slider.Container>
                        <Flex>
                            <Slider.Label>Quantity:&nbsp;</Slider.Label>
                            <Slider.Output />
                        </Flex>

                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumb />
                        </Slider.Control>
                    </Slider.Container>
                </Slider.Root>
            </Flex>

            <Flex direction="column" gap={2}>
                <Text.Title as="h3">Read-only</Text.Title>
                <Slider.Root {...props} readOnly>
                    <Slider.Container>
                        <Flex>
                            <Slider.Label>Quantity:&nbsp;</Slider.Label>
                            <Slider.Output />
                        </Flex>

                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumb />
                        </Slider.Control>
                    </Slider.Container>
                </Slider.Root>
            </Flex>
        </Flex>
    );
};
