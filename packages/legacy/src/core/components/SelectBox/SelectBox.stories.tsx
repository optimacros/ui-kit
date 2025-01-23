import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';

import { SelectBox } from './index';
import { SelectBoxProps } from './SelectBox.tsx';

const argTypes: Partial<ArgTypes> = {
    allowBlank: {
        control: 'boolean',
        description:
            'If `true`, the select box value can be empty. If `false` - value is first item of source.',
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, the select box will be disabled.',
    },
    required: {
        control: 'boolean',
        description: 'If `true`, the input element is required.',
    },
    auto: {
        control: 'boolean',
        description:
            'If `true`, then depending on the position of the select box on the page, ' +
            'the dropdown will appear above or below the select box.',
    },
    multiSelect: {
        control: 'boolean',
        description:
            'If `true`, value must be an array and the menu will support multiple selections.',
    },
    label: {
        control: 'text',
        description: 'The label of the select box container.',
    },
    labelKey: {
        control: 'text',
        description: 'Name of property used for display options names.',
    },
    value: {
        control: 'text',
        description: 'The value of the input element.',
    },
    valueKey: {
        control: 'text',
        description: 'Name of property used like select box value.',
    },
    name: {
        control: 'text',
        description: 'Name attribute of the input element.',
    },
    error: {
        control: 'text',
        description: 'If not empty, the error will be shown.',
    },
    source: {
        control: 'object',
        description: 'Array of options for select.',
    },
    theme: { table: { disable: true } },
    template: { table: { disable: true } },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onFocus: { table: { disable: true } },
};

const meta: Meta<typeof SelectBox> = {
    title: 'legacy/SelectBox',
    component: SelectBox,
    argTypes,
    tags: ['skip-test-runner'],
};
export default meta;

type Story = StoryObj<typeof SelectBox>;

const source = [
    { label: 'Newer first', value: 1 },
    { label: 'Older first', value: 2 },
    { label: 'No sort', value: 3 },
];
const customSource = [
    { title: 'One', key: 1 },
    { title: 'Two', key: 2 },
];

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

const Template: Story = {
    render: ({ ...args }) => {
        const [value, setValue] = useState<SelectBoxProps['value']>(1);

        return <SelectBox {...args} value={value} onChange={(val) => setValue(val)} />;
    },
};

const MultiTemplate: Story = {
    render: ({ ...args }) => {
        const [value, setValue] = useState<SelectBoxProps['value']>([1, 2]);

        return (
            <div>
                <SelectBox {...args} value={value} onChange={(val) => setValue(val)} />
            </div>
        );
    },
};

export const Basic: Story = {
    ...Template,
    args: {
        name: 'sort',
        label: 'Sort',
        source: source,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const Multi: Story = {
    ...MultiTemplate,
    args: {
        name: 'sort',
        label: 'Sort',
        source: source,
        multiSelect: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const Disabled: Story = {
    ...Template,
    args: {
        name: 'sort',
        label: 'Sort',
        source: source,
        disabled: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const Error: Story = {
    ...Template,
    args: {
        name: 'sort',
        label: 'Sort',
        source: source,
        error: 'Error description',
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const Required: Story = {
    ...Template,
    args: {
        name: 'sort',
        label: 'Sort',
        source: source,
        required: true,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const Custom: Story = {
    ...Template,
    args: {
        name: 'sort',
        label: 'Sort',
        labelKey: 'title',
        valueKey: 'key',
        source: customSource,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};
