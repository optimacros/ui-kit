import { ReactNode, useState } from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { SelectBoxProps, MultipleSelectBoxPanel } from '@optimacros-ui/kit-internal';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof MultipleSelectBoxPanel> = {
    title: 'UI KIT Internal/MultipleSelectBoxPanel',
    component: MultipleSelectBoxPanel,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof MultipleSelectBoxPanel>;

const source = [
    { label: 'Newer first', value: 1 },
    { label: 'Older first', value: 2 },
    { label: 'No sort', value: 3 },
];

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px' }}>{children}</div>
);

const Template: Story = {
    render: ({ ...args }) => {
        const [value, setValue] = useState<SelectBoxProps['value']>(1);

        return <MultipleSelectBoxPanel {...args} value={value} onChange={(val) => setValue(val)} />;
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
