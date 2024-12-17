import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ButtonGroup } from '.';

interface ButtonGroupProps {
    orientation?: 'horizontal' | 'vertical';
    children?: React.ReactNode;
}

export default {
    title: 'Ui kit core/ButtonGroup',
    component: ButtonGroup.Root,
    subcomponents: { ButtonGroupItem: ButtonGroup.Item },
    argTypes: {
        orientation: {
            control: { type: 'radio' },
            options: ['horizontal', 'vertical'],
            defaultValue: 'horizontal',
            description: 'The orientation of the button group',
        },
    },
    // decorators: [
    //     (Story) => (
    //         <div style={{ width: '200px' }}>
    //             <Story />
    //         </div>
    //     ),
    // ],
} as Meta;

// Template for the ButtonGroup stories
const Template: Story<ButtonGroupProps> = (args) => (
    <ButtonGroup.Root {...args}>
        <ButtonGroup.Item>Option 1</ButtonGroup.Item>
        <ButtonGroup.Item>Option 2</ButtonGroup.Item>
        <ButtonGroup.Item>Option 3</ButtonGroup.Item>
    </ButtonGroup.Root>
);

// Basic horizontal button group
export const Horizontal = Template.bind({});
Horizontal.args = {
    orientation: 'horizontal',
};

// Vertical button group
export const Vertical = Template.bind({});
Vertical.args = {
    orientation: 'vertical',
};

// Button group with disabled items
export const WithDisabledItems: Story<ButtonGroupProps> = (args) => (
    <ButtonGroup.Root {...args}>
        <ButtonGroup.Item>Enabled</ButtonGroup.Item>
        <ButtonGroup.Item disabled>Disabled</ButtonGroup.Item>
        <ButtonGroup.Item>Enabled</ButtonGroup.Item>
    </ButtonGroup.Root>
);

// Button group with active state
export const WithActiveItems: Story<ButtonGroupProps> = (args) => (
    <ButtonGroup.Root {...args}>
        <ButtonGroup.Item>Normal</ButtonGroup.Item>
        <ButtonGroup.Item active>Active</ButtonGroup.Item>
        <ButtonGroup.Item>Normal</ButtonGroup.Item>
    </ButtonGroup.Root>
);

// Complex example with mixed states
export const ComplexExample: Story<ButtonGroupProps> = (args) => (
    <ButtonGroup.Root {...args}>
        <ButtonGroup.Item>Default</ButtonGroup.Item>
        <ButtonGroup.Item active>Active Item</ButtonGroup.Item>
        <ButtonGroup.Item disabled>Disabled Item</ButtonGroup.Item>
        <ButtonGroup.Item active disabled>
            Active & Disabled
        </ButtonGroup.Item>
    </ButtonGroup.Root>
);

// Interactive example with state management
export const InteractiveExample: Story<ButtonGroupProps> = (args) => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <ButtonGroup.Root {...args}>
            {['First', 'Second', 'Third'].map((label, index) => (
                <ButtonGroup.Item
                    key={label}
                    active={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                >
                    {label}
                </ButtonGroup.Item>
            ))}
        </ButtonGroup.Root>
    );
};

// Custom styled example
export const CustomStyling: Story<ButtonGroupProps> = (args) => (
    <div className="space-y-4">
        <ButtonGroup.Root {...args} className="bg-gray-100 p-2 rounded-lg">
            <ButtonGroup.Item className="hover:bg-blue-500 hover:text-white">
                Custom Style 1
            </ButtonGroup.Item>
            <ButtonGroup.Item className="hover:bg-blue-500 hover:text-white">
                Custom Style 2
            </ButtonGroup.Item>
            <ButtonGroup.Item className="hover:bg-blue-500 hover:text-white">
                Custom Style 3
            </ButtonGroup.Item>
        </ButtonGroup.Root>
    </div>
);
