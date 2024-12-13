import { Tooltip } from '@optimacros-ui/core';
import { Flex } from '@optimacros-ui/flex';
import { RadioGroup } from './index';

export default {
    title: 'UI Kit core/RadioGroup',
    component: RadioGroup.Root,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'If `true`, component will be disabled',
        },
        onValueChange: {
            table: { disable: true },
        },
        value: {
            control: 'text',
            description: 'Checked value',
        },
    },
};

export const Base = (props) => {
    return (
        <RadioGroup.Root {...props}>
            <RadioGroup.Item value="gradient">
                <RadioGroup.Control value="gradient" />
                <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="partialGradient">
                <RadioGroup.Control value="partialGradient" />
                <RadioGroup.Text value="partialGradient">without gradient</RadioGroup.Text>
            </RadioGroup.Item>
        </RadioGroup.Root>
    );
};

export const Checked = (props) => {
    return (
        <RadioGroup.Root {...props} value="gradient">
            <RadioGroup.Item value="gradient">
                <RadioGroup.Control value="gradient" />
                <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="partialGradient">
                <RadioGroup.Control value="partialGradient" />
                <RadioGroup.Text value="partialGradient">without gradient</RadioGroup.Text>
            </RadioGroup.Item>
        </RadioGroup.Root>
    );
};

export const Disabled = (props) => {
    return (
        <Flex direction="row" gap="20">
            <RadioGroup.Root {...props} value="gradient" disabled>
                <RadioGroup.Item value="gradient">
                    <RadioGroup.Control value="gradient" />
                    <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                </RadioGroup.Item>
                <RadioGroup.Item value="partialGradient">
                    <RadioGroup.Control value="partialGradient" />
                    <RadioGroup.Text value="partialGradient">without gradient</RadioGroup.Text>
                </RadioGroup.Item>
            </RadioGroup.Root>
            <RadioGroup.Root {...props} disabled>
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

export const WithTooltip = (props) => {
    return (
        <div>
            <RadioGroup.Root>
                <Tooltip.Root
                    openDelay={0}
                    closeDelay={0}
                    positioning={{
                        offset: { crossAxis: 0, mainAxis: 0 },
                        placement: 'bottom-start',
                    }}
                >
                    <Tooltip.Trigger asChild>
                        <div>
                            <RadioGroup.Item value="gradient">
                                <RadioGroup.Control value="gradient" />
                                <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
                            </RadioGroup.Item>
                        </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Gradient</Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root
                    openDelay={0}
                    closeDelay={0}
                    positioning={{
                        offset: { crossAxis: 0, mainAxis: 0 },
                        placement: 'bottom-start',
                    }}
                >
                    <Tooltip.Trigger asChild>
                        <div>
                            <RadioGroup.Item value="partialGradient">
                                <RadioGroup.Control value="partialGradient" />
                                <RadioGroup.Text value="partialGradient">
                                    without gradient
                                </RadioGroup.Text>
                            </RadioGroup.Item>
                        </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Without gradient</Tooltip.Content>
                </Tooltip.Root>
            </RadioGroup.Root>
        </div>
    );
};
