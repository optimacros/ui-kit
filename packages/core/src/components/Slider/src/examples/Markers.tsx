import { Flex } from '@optimacros-ui/flex';
import { Slider } from '@optimacros-ui/slider';
import { ComponentProps } from 'react';

export const Markers = (props: ComponentProps<typeof Slider.Root>) => {
    return (
        <div>
            <Slider.Root {...props}>
                <Slider.Container>
                    <Flex>
                        <Slider.Label>Quantity:&nbsp;</Slider.Label>
                        <Slider.Output />
                    </Flex>

                    <Slider.Control>
                        <Slider.Track>
                            <Slider.Markers />
                            <Slider.Range />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider.Control>
                </Slider.Container>
            </Slider.Root>

            <Slider.Root {...props} value={[10]} step={2}>
                <Slider.Container>
                    <Flex>
                        <Slider.Label>Quantity:&nbsp;</Slider.Label>
                        <Slider.Output />
                    </Flex>

                    <Slider.Control>
                        <Slider.Track>
                            <Slider.Markers />
                            <Slider.Range />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider.Control>
                </Slider.Container>
            </Slider.Root>
        </div>
    );
};
