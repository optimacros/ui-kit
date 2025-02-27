import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import * as examples from './examples';
import { Clipboard } from './index';

const Wrapper = ({ children }: { children }) => <div style={{ width: '130px' }}>{children}</div>;

const argTypes: Partial<ArgTypes> = {
    ids: {
        control: 'object',
        description: 'The ids of the elements in the clipboard. Useful for composition.',
        table: { type: { summary: '{ root: string; input: string; label: string; }' } },
    },
    value: {
        control: 'text',
        description: 'The controlled value of the clipboard.',
        table: { type: { summary: 'string' } },
    },
    defaultValue: {
        control: 'text',
        description:
            "The initial value to be copied to the clipboard when rendered. Use when you don't need to control the value of the clipboard.",
        table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
    },
    onValueChange: {
        description: 'The function to be called when the value changes.',
        table: { type: { summary: '(details: ValueChangeDetails) => void' } },
    },
    onStatusChange: {
        description: 'The function to be called when the value is copied to the clipboard.',
        table: { type: { summary: '(details: CopyStatusDetails) => void' } },
    },
    timeout: {
        control: 'number',
        description: 'The timeout for the copy operation.',
        table: { type: { summary: 'number' }, defaultValue: { summary: 'undefined' } },
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

const meta: Meta<typeof Clipboard.Root> = {
    title: 'UI Kit core/Clipboard',
    component: Clipboard.Root,
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

type Story = StoryObj<typeof Clipboard.Root>;

export const Basic: Story = {
    render: examples.Basic,
};

export const Label: Story = {
    render: examples.WithLabel,
};
