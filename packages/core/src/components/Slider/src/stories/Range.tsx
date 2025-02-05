import { Slider } from '@optimacros-ui/slider';
import { Button } from '@optimacros-ui/button';

export const Range = () => {
    return (
        <Slider.Root value={[12, 34]}>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([12, 34])}>reset</Button>
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
