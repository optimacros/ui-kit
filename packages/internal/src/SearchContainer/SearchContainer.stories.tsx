import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { SearchContainer, SearchContainerProps } from './index';
import * as Stories from './stories';
import controlledContent from './stories/Controlled?raw';

const argTypes: Partial<ArgTypes> = {
    name: {
        control: 'text',
        description: 'Name for input element',
        type: { name: 'string', required: true },
    },
    value: {
        control: 'text',
        description: 'Value',
        type: { name: 'string', required: true },
    },
    onChange: {
        control: false,
        description: 'Value change handler',
        type: { name: 'function', required: true },
        table: { type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' } },
    },
    onBlur: {
        control: false,
        description: 'Blur event callback',
        table: { type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' } },
    },
    onKeyDown: {
        control: false,
        description: 'Keydown event callback',
        table: { type: { summary: '(event: KeyboardEvent<HTMLInputElement>) => void' } },
    },
    placeholder: {
        control: 'text',
        description: 'Input`s placeholder',
    },
    onClose: {
        control: false,
        description: 'Icon click callback',
        table: { type: { summary: '(event: MouseEventHandler<HTMLDivElement>) => void' } },
    },
    style: {
        control: 'text',
        description: 'Class name for the root element',
    },
    showIcon: {
        control: 'boolean',
        description: 'Whether to show close icon',
        table: { defaultValue: { summary: 'true' } },
    },
};

const meta: Meta<typeof SearchContainer> = {
    title: 'UI Kit internal/SearchContainer',
    component: SearchContainer,
    argTypes,
    parameters: {
        docs: {
            description: {
                component: `An input element with close icon`,
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof SearchContainer>;

const defaultProps: Partial<SearchContainerProps> = {
    name: 'name',
    placeholder: 'placeholder',
    onClose: () => console.info('close'),
    onBlur: () => console.info('blur'),
    onKeyDown: (e) => console.info(`key down: ${e.code}`),
    showIcon: true,
    style: 'className',
};

export const Basic: Story = {
    args: defaultProps,
};

export const Controlled: Story = {
    args: { ...defaultProps, value: 'value' },
    render: Stories.Controlled,
    parameters: {
        docs: { source: { code: controlledContent } },
        storySource: { source: controlledContent },
    },
};
