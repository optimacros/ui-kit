import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import * as examples from './examples';
import { RatingGroup } from './index';
import { Flex } from '@optimacros-ui/flex';

const Wrapper = ({ children }: { children }) => <div style={{ width: '130px' }}>{children}</div>;

const argTypes: Partial<ArgTypes> = {
    translations: {
        control: 'object',
        description:
            'Specifies the localized strings that identify the accessibility elements and their states',
        table: { type: { summary: 'IntlTranslations' } },
    },
    count: {
        control: 'number',
        description: 'The total number of ratings.',
        table: { type: { summary: 'number' } },
    },
    name: {
        control: 'text',
        description: 'The name attribute of the rating element (used in forms).',
        table: { type: { summary: 'string' } },
    },
    form: {
        control: 'text',
        description: 'The associate form of the underlying input element.',
        table: { type: { summary: 'string' } },
    },
    value: {
        control: 'number',
        description: 'The controlled value of the rating.',
        table: { type: { summary: 'number' } },
    },
    readOnly: {
        control: 'boolean',
        description: 'Whether the rating is readonly.',
        table: { type: { summary: 'boolean' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the rating is disabled.',
        table: { type: { summary: 'boolean' } },
    },
    required: {
        control: 'boolean',
        description: 'Whether the rating is required.',
        table: { type: { summary: 'boolean' } },
    },
    allowHalf: {
        control: 'boolean',
        description: 'Whether to allow half stars.',
        table: { type: { summary: 'boolean' } },
    },
    autoFocus: {
        control: 'boolean',
        description: 'Whether to autofocus the rating.',
        table: { type: { summary: 'boolean' } },
    },
    onValueChange: {
        description: 'Function to be called when the rating value changes.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    onHoverChange: {
        description: 'Function to be called when the rating value is hovered.',
        table: { type: { summary: '(details: HoverChangeDetails) => void' } },
    },
    dir: {
        control: 'radio',
        options: ['ltr', 'rtl'],
        description: "The document's text/writing direction.",
        table: { type: { summary: '"ltr" | "rtl"' } },
    },
    id: {
        control: 'text',
        description: 'The unique identifier of the machine.',
        table: { type: { summary: 'string' } },
    },
    getRootNode: {
        description:
            'A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.',
        table: { type: { summary: '() => ShadowRoot | Node | Document' } },
    },
};

const meta: Meta<typeof RatingGroup.Root> = {
    title: 'UI Kit core/RatingGroup',
    component: RatingGroup.Root,
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

type Story = StoryObj<typeof RatingGroup.Root>;

export const Basic: Story = {
    render: examples.Basic,
};

export const WithLabel: Story = {
    render: examples.WithLabel,
};

export const HalfIcon: Story = {
    args: { allowHalf: true },
    render: examples.HalfIcon,
};

export const Disabled: Story = {
    args: { disabled: true },
    render: (args) => (
        <Flex direction="column" gap={4}>
            <examples.Basic {...args} />
            <examples.Basic {...args} value={4} />
        </Flex>
    ),
};

export const DefaultValue: Story = {
    args: { value: 2.5, allowHalf: true },
    render: examples.HalfIcon,
};

export const ReadOnly: Story = {
    args: { value: 3, readOnly: true },
    render: examples.WithLabel,
};

export const CustomCount: Story = {
    render: () => (
        <Flex direction="column" gap={4}>
            <examples.Basic count={2} value={1} />
            <examples.Basic count={3} value={2} />
            <examples.Basic count={4} value={3} />
            <examples.Basic count={5} value={4} />
        </Flex>
    ),
};
