import { Slider } from '..';
import { ComponentProps, useCallback, useState } from 'react';
import { Basic } from './Basic';
import { ValueChangeDetails } from '@zag-js/slider';
import { Button } from '@optimacros-ui/button';
import { Flex } from '@optimacros-ui/flex';
import { cloneDeep } from '@optimacros-ui/utils';

export const Controlled = ({ value: valueProp, ...rest }: ComponentProps<typeof Slider.Root>) => {
    const [value, setValue] = useState(valueProp);

    const handleChange = (details: ValueChangeDetails) => {
        setValue(details.value);
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const handleReset = useCallback(() => {
        setValue(cloneDeep(valueProp));
    }, []);

    return (
        <Flex direction="column" gap={4} align="stretch">
            <Button onClick={handleReset}>reset to initial value</Button>
            <Basic {...rest} value={value} onValueChangeEnd={handleChange} />
        </Flex>
    );
};
