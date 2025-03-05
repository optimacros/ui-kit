import { ComponentProps, ReactNode } from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { TreeView } from './index';
import { createMockMenuItems, mockItems } from './examples/mock';
import * as examples from './examples';
import * as scenarios from './__tests__/scenarios';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

const argTypes: Partial<ArgTypes<ComponentProps<typeof TreeView.Root>>> = {
    menuItems: {
        control: { type: 'object' },
        description: 'Tree view menu items data structure',
    },
    selectedValue: {
        control: { type: 'object' },
        description: 'The controlled selected node ids',
        table: { type: { summary: 'string[]' } },
    },
    expandedValue: {
        control: { type: 'object' },
        description: 'The controlled expanded node ids',
        table: { type: { summary: 'string[]' } },
    },
    defaultSelectedValue: {
        control: { type: 'object' },
        description: `The initial selected node ids when rendered. Use when you don't need to control the selected node ids`,
        table: { type: { summary: 'string[]' } },
    },
    defaultExpandedValue: {
        control: { type: 'object' },
        description: `The initial expanded node ids when rendered. Use when you don't need to control the expanded node ids`,
        table: { type: { summary: 'string[]' } },
    },
    onExpandedChange: {
        action: 'expandedChanged',
        description: 'Callback fired when expansion state changes',
        table: { type: { summary: '(details: ExpandedChangeDetails) => void' } },
    },
    onSelectionChange: {
        action: 'selectedChanged',
        description: 'Callback fired when selection changes',
        table: { type: { summary: '(details: SelectionChangeDetails) => void' } },
    },
    selectionMode: {
        control: { type: 'radio' },
        options: ['single', 'multiple'],
        table: { defaultValue: { summary: 'single' } },
        description: 'Selection mode for tree items',
    },
    id: { table: { disable: true } },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
};

const meta: Meta<typeof TreeView.Root> = {
    title: 'UI Kit core/TreeView',
    component: TreeView.Root,
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

const menuItems = createMockMenuItems(3);

type Story = StoryObj<typeof TreeView.Root>;

export const Basic: Story = {
    args: {
        menuItems: mockItems,
        selectedValue: undefined,
        expandedValue: undefined,
        defaultExpandedValue: undefined,
        defaultSelectedValue: undefined,
    },
    render: examples.Basic,
    play: scenarios.basic,
};

export const WithIcons: Story = {
    args: { menuItems },
    render: examples.WithIcons,
    tags: ['skip-test-runner'],
};

export const Multiple: Story = {
    args: { menuItems: mockItems, selectionMode: 'multiple', defaultSelectedValue: ['1', '3'] },
    render: examples.Basic,
    play: scenarios.multiple,
};

export const DefaultValues: Story = {
    args: {
        menuItems: mockItems,
        selectionMode: 'multiple',
        defaultSelectedValue: ['1'],
        defaultExpandedValue: ['3', '3/1'],
    },
    render: examples.Basic,
    play: scenarios.defaultValues,
};
