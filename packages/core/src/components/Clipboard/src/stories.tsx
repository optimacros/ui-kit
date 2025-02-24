import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import * as examples from './examples';
import { Clipboard } from './index';

const Wrapper = ({ children }: { children }) => <div style={{ width: '130px' }}>{children}</div>;

const argTypes: Partial<ArgTypes> = {
    positioning: {
        control: 'object',
        description: 'The user provided options used to position the popover content',
        table: { type: { summary: 'PositioningOptions' } },
    },
    openDelay: {
        control: 'number',
        description: `The open delay of the tooltip.`,
        table: { defaultValue: { summary: '1000' } },
    },
    closeDelay: {
        control: 'number',
        description: `The close delay of the tooltip.`,
        table: { defaultValue: { summary: '500' } },
    },
    open: {
        control: 'boolean',
        description: `The controlled open state of the hover card`,
    },
    onOpenChange: {
        control: 'number',
        description: `Function called when the tooltip is opened..`,
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
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
