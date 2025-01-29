import { Slider } from '@optimacros-ui/slider';

export const Markers = () => {
    return (
        <div>
            <Slider.Root value={[10]} min={0} max={20} step={2}>
                <Slider.Container>
                    <Slider.Label>Quantity</Slider.Label>
                    <Slider.Output />
                    <Slider.Control>
                        <Slider.Track>
                            <Slider.Markers />
                            <Slider.Range />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider.Control>
                </Slider.Container>
            </Slider.Root>

            <Slider.Root value={[10]} min={0} max={17} step={2}>
                <Slider.Container>
                    <Slider.Label>Quantity</Slider.Label>
                    <Slider.Output />
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
