import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import * as examples from './examples';
import { HoverCard } from './index';

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

const meta: Meta<typeof HoverCard.Root> = {
    title: 'UI Kit core/HoverCard',
    component: HoverCard.Root,
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

type Story = StoryObj<HoverCard.Props>;

export const Basic: Story = {
    render: examples.Basic,
};

export const Open: Story = {
    args: { defaultOpen: true },
    render: examples.Basic,
};

export const CloseDelay: Story = {
    args: { closeDelay: 2000 },
    render: examples.Basic,
};

export const Positioning: Story = {
    args: {
        positioning: {
            placement: 'right',
        },
    },
    render: examples.Basic,
};
