import { RadioGroup } from '..';

export const Basic = (props: RadioGroup.RootProps) => {
    return (
        <RadioGroup.Root {...props}>
            <RadioGroup.Item value="gradient" data-testid="item-1">
                <RadioGroup.Control value="gradient" data-testid="control-1" />
                <RadioGroup.Text value="gradient" data-testid="text-1">
                    gradient
                </RadioGroup.Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="partialGradient" data-testid="item-2">
                <RadioGroup.Control value="partialGradient" data-testid="control-2" />
                <RadioGroup.Text value="partialGradient" data-testid="text-2">
                    without gradient
                </RadioGroup.Text>
            </RadioGroup.Item>
        </RadioGroup.Root>
    );
};
