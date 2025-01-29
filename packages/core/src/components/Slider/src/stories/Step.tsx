import { Slider } from '@optimacros-ui/slider';
import { Button } from '@optimacros-ui/button';

export const Step = () => {
    return (
        <Slider.Root value={[2, 3.4]} min={0} max={10} step={0.1}>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([2, 3.4])}>reset</Button>
                    </div>

                    <Slider.Container>
                        <Slider.Label>Quantity</Slider.Label>
                        <Slider.Output />
                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumb />
                        </Slider.Control>
                    </Slider.Container>
                </>
            )}
        </Slider.Root>
    );
};
