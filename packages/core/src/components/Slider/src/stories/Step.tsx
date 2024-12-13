import { Slider } from '@optimacros-ui/slider';
import { Button } from '@optimacros-ui/button';

export const Step = () => {
    return (
        <Slider.RootProvider value={[2, 3.4]} min={0} max={10} step={0.1}>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([2, 3.4])}>reset</Button>
                    </div>

                    <Slider.Root>
                        <Slider.Label>Quantity</Slider.Label>
                        <Slider.Output />
                    </Slider.Root>
                </>
            )}
        </Slider.RootProvider>
    );
};
