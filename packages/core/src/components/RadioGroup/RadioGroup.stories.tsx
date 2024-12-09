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
            <RadioGroup.Item value="notGradient">
                <RadioGroup.Control value="notGradient" />
                <RadioGroup.Text value="notGradient">specified values only</RadioGroup.Text>
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
            <RadioGroup.Item value="notGradient">
                <RadioGroup.Control value="notGradient" />
                <RadioGroup.Text value="notGradient">specified values only</RadioGroup.Text>
            </RadioGroup.Item>
        </RadioGroup.Root>
    );
};

export const Disabled = (props) => {
    return (
        <RadioGroup.Root {...props} value="gradient" disabled>
            <RadioGroup.Item value="gradient">
                <RadioGroup.Control value="gradient" />
                <RadioGroup.Text value="gradient">gradient</RadioGroup.Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="partialGradient">
                <RadioGroup.Control value="partialGradient" />
                <RadioGroup.Text value="partialGradient">without gradient</RadioGroup.Text>
            </RadioGroup.Item>
            <RadioGroup.Item value="notGradient">
                <RadioGroup.Control value="notGradient" />
                <RadioGroup.Text value="notGradient">specified values only</RadioGroup.Text>
            </RadioGroup.Item>
        </RadioGroup.Root>
    );
};
