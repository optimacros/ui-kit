import { useState } from 'react';
import { RadioGroup } from '..';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';

export const Controlled = (props: RadioGroup.RootProps) => {
    const { value: valueProp } = props;

    const [value, setValue] = useState(valueProp || 'gradient');

    const handleValueChange = (details: RadioGroup.ValueChangeDetails) => {
        console.info(details.value);

        alert('nope');
    };

    const handleSelectOtherOption = () => {
        setValue((val) => (val === 'gradient' ? 'partialGradient' : 'gradient'));
    };

    return (
        <Flex direction="column" gap={4}>
            <Button onClick={handleSelectOtherOption}>Select other option</Button>

            <RadioGroup.Root {...props} value={value} onValueChange={handleValueChange}>
                <RadioGroup.Item value="gradient">
                    <RadioGroup.Control value="gradient" />
                    <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                </RadioGroup.Item>
                <RadioGroup.Item value="partialGradient">
                    <RadioGroup.Control value="partialGradient" />
                    <RadioGroup.Text value="partialGradient">without gradient</RadioGroup.Text>
                </RadioGroup.Item>
            </RadioGroup.Root>
        </Flex>
    );
};
