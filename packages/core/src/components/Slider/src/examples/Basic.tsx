import { Flex } from '@optimacros-ui/flex';
import { Slider } from '..';
import { ComponentProps } from 'react';

export const Basic = (props: ComponentProps<typeof Slider.Root>) => {
    return (
        <Slider.Root {...props} data-testid="root">
            <Slider.Container data-testid="container">
                <Flex>
                    <Slider.Label>Quantity:&nbsp;</Slider.Label>
                    <Slider.Output data-testid="output" />
                </Flex>

                <Slider.Control data-testid="control">
                    <Slider.Track
                        data-testid="track"
                        onClick={(e) => {
                            console.info('evemt', e);
                        }}
                    >
                        <Slider.Range data-testid="range" />
                    </Slider.Track>
                    <Slider.Thumb
                        data-testid="thumb"
                        onPointerDown={(e) => {
                            console.info('evemt d', e);
                        }}
                        onMouseDown={(e) => {
                            console.info('evemt d', e);
                        }}
                        onPointerUp={(e) => {
                            console.info('evemt u', e);
                        }}
                    />
                </Slider.Control>
            </Slider.Container>
        </Slider.Root>
    );
};
