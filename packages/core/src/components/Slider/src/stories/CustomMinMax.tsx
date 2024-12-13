import { Slider } from '@optimacros-ui/slider';
import { Button } from '@optimacros-ui/button';

export const CustomMinMax = () => {
    return (
        <Slider.RootProvider value={[12, 34]} min={-100} max={50}>
            {(api) => (
                <>
                    <div style={{ marginBottom: 50 }}>
                        <Button onClick={() => api.setValue([12, 34])}>reset</Button>
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
