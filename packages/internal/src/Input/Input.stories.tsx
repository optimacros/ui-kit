import { ReactNode } from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Input } from './index';

const argTypes: Partial<ArgTypes> = {
    multiline: {
        control: 'boolean',
        description: 'If `true`, a textarea element is rendered.',
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    required: {
        control: 'boolean',
        description: 'If `true`, the `input` element is required.',
    },
    oneLineError: {
        control: 'boolean',
        description: '',
    },
    collapsed: {
        control: 'boolean',
        description: 'If `true`, the `label` is hidden.',
    },
    floating: {
        control: 'boolean',
        description: 'If `false`, the label is visible only when input value empty.',
    },
    autoFocus: {
        control: 'boolean',
        description: 'If `true`, the input will be focused on page load.',
    },
    readOnly: {
        control: 'boolean',
        description: 'It prevents the user from changing the value of the input.',
    },
    name: {
        control: 'text',
        description: 'Value for `name` input attribute.',
    },
    defaultValue: {
        control: 'text',
        description: 'The default value. Use when the component is not controlled.',
    },
    value: {
        control: 'text',
        description: 'Current value of the `input` element, required for a controlled component.',
    },
    label: {
        control: 'text',
        description: 'The text string to use for the floating label element.',
    },
    placeholder: {
        control: 'text',
        description: 'The short hint displayed in the input before the user enters a value.',
    },
    hint: {
        control: 'text',
        description: 'The text string to use for hint text element.',
    },
    error: {
        control: 'text',
        description: 'Give an error content to display under the field.',
    },
    icon: {
        control: 'text',
        description: 'Value of the icon (See Font Icon Component).',
    },
    type: {
        control: 'text',
        description: 'Type of the input element. It can be a valid HTML5 input type.',
    },
    autoComplete: {
        control: 'text',
        description:
            'This prop helps users to fill forms faster, especially on mobile devices. ' +
            "The name can be confusing, as it's more like an autofill.",
    },
    rows: {
        control: 'number',
        description: 'Number of rows to display when multiline option is set to true.',
    },
    maxLength: {
        control: 'number',
        description: 'Specifies the maximum number of characters allowed in the component.',
    },
    tabIndex: {
        control: 'number',
        description:
            'The tabindex allows input to be focusable, allow or prevent ' +
            'them from being sequentially focusable (usually with the Tab key, hence the name) ' +
            'and determine their relative ordering for sequential focus navigation.',
    },
    onBlur: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    onKeyPress: { table: { disable: true } },
    className: { table: { disable: true } },
    theme: { table: { disable: true } },
};

const meta: Meta<typeof Input> = {
    title: 'UI KIT Internal/Input',
    component: Input,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Input>;

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

export const Basic: Story = {
    args: {
        name: 'Basic',
        placeholder: 'Enter value',
        label: 'Basic',
        collapsed: false,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Required: Story = {
    args: {
        name: 'welcome',
        value: 'Hello World',
        label: 'Required',
        required: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Disabled: Story = {
    args: {
        name: 'welcome',
        value: 'Hello World',
        label: 'Disabled',
        disabled: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Error: Story = {
    args: {
        name: 'welcome',
        value: 'Hello World',
        error: 'Incorrect entry.',
        label: 'Error',
        required: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Multiline: Story = {
    args: {
        name: 'welcome',
        value: 'Hello World',
        label: 'Multiline',
        multiline: true,
        rows: 4,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Readonly: Story = {
    args: {
        name: 'welcome',
        value: 'Hello World',
        label: 'Readonly',
        readOnly: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const AutoFocus: Story = {
    args: {
        name: 'welcome',
        value: 'Hello World',
        label: 'Auto focus',
        autoFocus: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Hint: Story = {
    args: {
        name: 'welcome',
        value: 'Hello World',
        label: 'Hint',
        hint: 'Hint text',
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const MaxLength: Story = {
    args: {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter name',
        maxLength: 8,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Icon: Story = {
    args: {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter name',
        icon: 'people',
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Radio: Story = {
    args: {
        name: 'woman',
        label: 'Woman',
        type: 'radio',
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => (
            <div style={{ width: '40px' }}>
                <Story />
            </div>
        ),
    ],
};
