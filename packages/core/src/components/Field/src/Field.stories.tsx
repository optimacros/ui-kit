import { Field } from '.';
import { ReactNode } from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Flex } from '@optimacros-ui/flex';
import { useFormData } from '@optimacros-ui/utils';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as stories from './stories';
import * as scenarios from './__tests__/scenarios';

const argTypes: ArgTypes<Field.Props> = {
    status: {
        control: 'radio',
        options: ['default', 'error', 'readonly', 'warning'],
        table: { defaultValue: { summary: 'default' } },
    },
    collapsed: {
        control: 'boolean',
        description: 'Whether the input is collapsed ???',
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: 'boolean',
        description: 'Whether the field is required',
        table: { defaultValue: { summary: 'false' } },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
};

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>{children}</div>
);

const meta: Meta<typeof Field.Root> = {
    title: 'UI Kit core/Field',
    component: Field.Root,
    argTypes,
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Field.Root>;

export const Base: Story = {
    render: stories.Basic,
    play: scenarios.basic,
};

export const Collapsed: Story = {
    args: { collapsed: true },
    render: stories.Basic,
};

export const Required: Story = {
    args: { required: true },
    render: stories.Basic,
};

export const Debounce: Story = {
    render: stories.Debounce,
};

export const Disabled: Story = {
    render: (props) => {
        return (
            <Field.Root {...props} data-testid="root">
                <Field.FloatingLabel htmlFor="base" data-testid="label">
                    label
                </Field.FloatingLabel>
                <Field.Input id="base" data-testid="input" disabled value="im so disabled" />
                <Field.FloatingHint data-testid="hint">hint do this</Field.FloatingHint>
            </Field.Root>
        );
    },
};

export const Readonly: Story = {
    args: { status: 'readonly' },
    render: (props) => {
        return (
            <Field.Root {...props} data-testid="root">
                <Field.FloatingLabel htmlFor="base" data-testid="label">
                    label
                </Field.FloatingLabel>
                <Field.Input id="base" data-testid="input" value="im readonly, bruh" />
                <Field.FloatingHint data-testid="hint">hint do this</Field.FloatingHint>
            </Field.Root>
        );
    },
};

export const WithIcon = () => {
    return (
        <div className="flex flex-col gap-4">
            <Field.Root>
                <Field.FloatingIcon>
                    <Icon value={'people'} />
                </Field.FloatingIcon>
                <Field.Input id="ic-1" placeholder="Enter" />
                <Field.FloatingLabel htmlFor="ic-1">Enter name</Field.FloatingLabel>
                <Field.FloatingHint>hint do this</Field.FloatingHint>
            </Field.Root>
            <Field.Root>
                <Field.FloatingIcon>
                    <Icon value={'people'} />
                </Field.FloatingIcon>
                <Field.FloatingLabel htmlFor="ic-2">Enter name</Field.FloatingLabel>
                <Field.Input id="ic-2" placeholder="Enter" />
                <Field.FloatingHint>hint do this</Field.FloatingHint>
            </Field.Root>
        </div>
    );
};

export const ErrorStatus: Story = {
    args: { status: 'error' },
    render: (props) => (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="err">Error</Field.FloatingLabel>
            <Field.Input id="err" />
            <Field.FloatingError>error</Field.FloatingError>
        </Field.Root>
    ),
};

export const LongAdditionText: Story = {
    render: (props) => (
        <Field.Root {...props}>
            <Field.FloatingLabel htmlFor="err">
                Too loooooooooooooong field name
            </Field.FloatingLabel>
            <Field.Input id="err" />
            <Field.FloatingHint>Too loooooooooooooong hint text</Field.FloatingHint>
        </Field.Root>
    ),
};

export const ErrorOneLine: Story = {
    render: (props) => {
        return (
            <Field.Root {...props}>
                <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
                <Field.Input id="err2" />
                <Field.FloatingError>error</Field.FloatingError>
            </Field.Root>
        );
    },
};

export const Multiline: Story = {
    render: (props) => {
        return (
            <Field.Root {...props}>
                <Field.FloatingLabel htmlFor="test">label</Field.FloatingLabel>
                <Field.Multiline id="test" rows={3} />
            </Field.Root>
        );
    },
};

export const Counter: Story = {
    render: (props) => {
        return (
            <Field.Root {...props}>
                <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
                <Field.Input id="err2" />
                <Field.Counter length={0} maxLength={8} />
            </Field.Root>
        );
    },
};

export const TextArea: StoryObj<typeof Field.TextArea> = {
    render: (props) => {
        return (
            <Field.Root>
                <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
                <Field.TextArea id="err2" {...props} />
                <Field.FloatingHint>some hint there</Field.FloatingHint>
                <Field.FloatingError>some error there</Field.FloatingError>
            </Field.Root>
        );
    },
};

export const Pin: StoryObj<typeof Field.PinInput.Input> = {
    render: (props) => {
        return (
            <Field.Root style={{ width: 300 }}>
                <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
                <Field.PinInput.Input id="err2" pins={6} {...props} />
                <Field.FloatingHint>some hint there</Field.FloatingHint>
                <Field.FloatingError>some error there</Field.FloatingError>
            </Field.Root>
        );
    },
};

export const NumberInput: StoryObj<typeof Field.NumberInput.Root> = {
    render: (props) => {
        return (
            <Field.Root style={{ width: 300 }}>
                <Field.FloatingLabel htmlFor="err2">Error</Field.FloatingLabel>
                <Field.NumberInput.Root id="err2" step={5} min={0} value="0" max={100} {...props}>
                    <Flex gap="2" direction="column">
                        <Flex gap="2">
                            <Field.NumberInput.Decrement>-</Field.NumberInput.Decrement>
                            <Field.NumberInput.Input />
                            <Field.NumberInput.Increment>+</Field.NumberInput.Increment>
                        </Flex>
                        <Field.NumberInput.Scrubber />
                    </Flex>
                </Field.NumberInput.Root>
                <Field.FloatingHint>some hint there</Field.FloatingHint>
                <Field.FloatingError>some error there</Field.FloatingError>
            </Field.Root>
        );
    },
};

/**TODO */

export const Formt: Story = {
    render: () => {
        const [value, onChange] = useFormData();

        return (
            <>
                <form onBlur={onChange}>
                    {/* @ts-ignore */}
                    <Base.render name="input-1" />
                    {/* @ts-ignore */}
                    <Pin.render name="pin" />
                    {/* @ts-ignore */}
                    <NumberInput.render
                        name="number"
                        formatOptions={{
                            style: 'currency',
                            currency: 'USD',
                        }}
                    />
                </form>
                {JSON.stringify(value)}
            </>
        );
    },
};
