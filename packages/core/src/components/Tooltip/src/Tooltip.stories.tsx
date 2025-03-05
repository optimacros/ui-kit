import { Tooltip } from '@optimacros-ui/tooltip';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import * as scenarios from './__tests__/scenarios';
import * as examples from './examples';

const argTypes: Partial<ArgTypes> = {
    positioning: {
        control: 'object',
        description: 'The user provided options used to position the popover content',
        table: {
            defaultValue: {
                summary:
                    '{  strategy: "absolute",  placement: "bottom",  listeners: true,  gutter: 8,  flip: true,  slide: true,  overlap: false,  sameWidth: false,  fitViewport: false,  overflowPadding: 8,  arrowPadding: 4, offset: { mainAxis: undefined, crossAxis: undefined }, }',
            },
            type: { summary: 'PositioningOptions' },
        },
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
    interactive: {
        control: 'boolean',
        description: `Whether the tooltip's content is interactive. In this mode, the tooltip will remain open when user hovers over the content.`,
        table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
        control: 'boolean',
        description: `Whether the tooltip is disabled`,
        table: { defaultValue: { summary: 'false' } },
    },
    defaultOpen: {
        control: 'boolean',
        description: `Whether the tooltip is open`,
        table: { defaultValue: { summary: 'false' } },
    },
    open: {
        control: 'boolean',
        description: `Whether the tooltip is controlled by the user`,
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: 'number',
        description: `Function called when the tooltip is opened..`,
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
};

const meta: Meta<typeof Tooltip.Root> = {
    argTypes,
    title: 'UI Kit core/Tooltip',
    component: Tooltip.Root,
};

export default meta;

export const Basic: StoryObj<typeof Tooltip.Root> = {
    args: { onOpenChange: fn() },
    render: examples.Basic,
    play: scenarios.basic,
};

export const LongText: StoryObj<typeof Tooltip.Root> = {
    ...Base,
    args: {
        children:
            'The disease was diagnosed as pseudopseudohypoparathyroidism, a rare genetic disorder',
    },
};

export const Positioning: StoryObj<typeof Tooltip.Root> = {
    args: {
        open: true,
    },
    render: examples.Placement,
};

export const NoDelay: StoryObj<typeof Tooltip.Root> = {
    render: examples.Basic,
    args: {
        openDelay: 0,
        closeDelay: 0,
    },
    tags: ['skip-test-runner'],
};

export const Disabled: StoryObj<typeof Tooltip.Root> = {
    render: examples.Basic,
    args: {
        disabled: true,
    },
    tags: ['skip-test-runner'],
};

export const Interactive: StoryObj<typeof Tooltip.Root> = {
    args: { interactive: true },
    render: examples.Interactive,
    play: scenarios.interactive,
};

export const ApiControlled: StoryObj<typeof Tooltip.Root> = {
    args: { interactive: true },
    render: examples.ApiControlled,
    tags: ['skip-test-runner'],
};
