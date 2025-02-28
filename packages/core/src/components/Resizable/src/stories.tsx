import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import * as examples from './examples';
import { Resizable } from './index';
import { Flex } from '@optimacros-ui/flex';

const Wrapper = ({ children }: { children }) => <div style={{ width: '130px' }}>{children}</div>;

const argTypes: Partial<ArgTypes> = {
    children: {
        control: 'object',
        description: 'A React element to be rendered inside the component.',
        table: { type: { summary: 'React.Element<any>' } },
    },
    width: {
        control: 'number',
        description: 'The width of the resizable component.',
        table: { type: { summary: 'number' }, defaultValue: { summary: 'undefined' } },
    },
    height: {
        control: 'number',
        description: 'The height of the resizable component.',
        table: { type: { summary: 'number' }, defaultValue: { summary: 'undefined' } },
    },
    handle: {
        control: 'object',
        description:
            'ReactElement or a function returning a React element used as the handle for resizing.',
        table: {
            type: {
                summary:
                    'ReactElement<any> | (resizeHandle: ResizeHandleAxis, ref: ReactRef<HTMLElement>) => ReactElement<any>',
            },
        },
    },
    handleSize: {
        control: 'object',
        description: 'Size of the resize handle, in pixels.',
        table: { type: { summary: '[number, number]' }, defaultValue: { summary: '[10, 10]' } },
    },
    lockAspectRatio: {
        control: 'boolean',
        description: 'If true, the component will maintain its aspect ratio during resizing.',
        table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    axis: {
        control: 'radio',
        options: ['both', 'x', 'y', 'none'],
        description: 'Defines the axis along which resizing is permitted.',
        table: {
            type: { summary: "'both' | 'x' | 'y' | 'none'" },
            defaultValue: { summary: "'both'" },
        },
    },
    minConstraints: {
        control: 'object',
        description: 'Minimum size constraints in the format [width, height].',
        table: { type: { summary: '[number, number]' }, defaultValue: { summary: '[10, 10]' } },
    },
    maxConstraints: {
        control: 'object',
        description: 'Maximum size constraints in the format [width, height].',
        table: {
            type: { summary: '[number, number]' },
            defaultValue: { summary: '[Infinity, Infinity]' },
        },
    },
    onResizeStop: {
        description: 'Callback fired when resizing stops.',
        table: { type: { summary: '(e: SyntheticEvent, data: ResizeCallbackData) => any' } },
    },
    onResizeStart: {
        description: 'Callback fired when resizing starts.',
        table: { type: { summary: '(e: SyntheticEvent, data: ResizeCallbackData) => any' } },
    },
    onResize: {
        description: 'Callback fired while resizing.',
        table: { type: { summary: '(e: SyntheticEvent, data: ResizeCallbackData) => any' } },
    },
    draggableOpts: {
        control: 'object',
        description: 'Options for draggable behavior.',
        table: { type: { summary: 'Object' }, defaultValue: { summary: 'undefined' } },
    },
    resizeHandles: {
        control: 'object',
        description: 'Array of handles used to resize the component.',
        table: {
            type: { summary: 'Array<ResizeHandleAxis>' },
            defaultValue: { summary: "['se']" },
        },
    },
};

const meta: Meta<typeof Resizable.Root> = {
    title: 'UI Kit core/Resizable',
    component: Resizable.Root,
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

type Story = StoryObj<typeof Resizable.Root>;

const text = 'John P. Brady, give me a black walnut box of quite a small';

export const Basic: Story = {
    args: {
        width: 100,
        height: 100,
        minConstraints: [100, 100],
        maxConstraints: [400, 400],
        children: text,
    },
    render: examples.Basic,
};

export const DifferentAxis: Story = {
    args: {
        width: 100,
        height: 100,
        minConstraints: [100, 100],
        maxConstraints: [200, 200],
        children: text,
    },
    render: (args) => (
        <Flex gap={10}>
            <Flex gap={2} direction="column">
                <b>Both:</b>
                <examples.Basic {...args} axis="both" />
            </Flex>
            <Flex gap={2} direction="column">
                <b>Y:</b>
                <examples.Basic {...args} axis="y" />
            </Flex>
            <Flex gap={2} direction="column">
                <b>X:</b>
                <examples.Basic {...args} axis="x" />
            </Flex>
            <Flex gap={2} direction="column">
                <b>None:</b>
                <examples.Basic {...args} axis="none" />
            </Flex>
        </Flex>
    ),
};

export const WithMarkDownEditor: Story = {
    render: examples.WithMarkdownEditor,
};
