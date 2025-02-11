import React, { ComponentProps } from 'react';
import { Collapsible } from '.';
import './index.css';
import { Icon } from '@optimacros-ui/icon';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';

const argTypes: ArgTypes<Partial<ComponentProps<typeof Collapsible.Root>>> = {
    open: {
        control: 'boolean',
        description: 'Whether the collapsible is open',
        table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
        control: false,
        description: 'Function called when the popup is opened',
        table: { type: { summary: '(details: OpenChangeDetails) => void' } },
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the collapsible is disabled',
        table: { defaultValue: { summary: 'false' } },
    },
    'open.controlled': {
        control: 'boolean',
        description: 'Whether the collapsible open state is controlled by the user',
        table: { defaultValue: { summary: 'false' } },
    },
};

const ChevronDown = () => <Icon value="chevron_left" className="collapsible-icon" rotate={-90} />;

const css = `
/* collapsible.css */
.collapsible-root {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
}

.collapsible-container {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.collapsible-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  font-weight: 500;
  text-align: left;
}

.collapsible-trigger:hover {
  background-color: #f9fafb;
}

.collapsible-content {
  padding: 0.5rem 1rem;
  border-top: 1px solid #e5e7eb;
}

.collapsible-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s ease;
}

.collapsible-icon[data-state='open'] {
  transform: rotate(180deg);
}

/* Custom Styled Collapsible */
.collapsible-custom {
  background-color: #eff6ff;
  border: 2px solid #bfdbfe;
  border-radius: 0.75rem;
  overflow: hidden;
}

.collapsible-custom .collapsible-trigger {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  color: #1d4ed8;
}

.collapsible-custom .collapsible-trigger:hover {
  background-color: #dbeafe;
}

.collapsible-custom .collapsible-content {
  padding: 1rem 1.5rem;
  background-color: white;
  border-top: 2px solid #bfdbfe;
}

.collapsible-custom .collapsible-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #3b82f6;
}

/* Multiple Sections */
.collapsible-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Controlled Collapsible */
.close-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  cursor: pointer;
}

.close-button:hover {
  background-color: #e5e7eb;
}

.collapsible-icon {
  transition: transform 0.2s ease;
}

[data-state='open'] .collapsible-icon {
  transform: rotate(180deg);
}

`;

const meta = {
    title: 'Ui kit core/Collapsible',
    component: Collapsible.Root,
    parameters: {
        layout: 'centered',
    },
    argTypes,
    decorators: [
        (Story) => (
            <>
                <style>{css}</style>
                <Story />
            </>
        ),
    ],
} satisfies Meta<typeof Collapsible.Root>;

export default meta;

type Story = StoryObj<typeof Collapsible.Root>;

// Basic Collapsible Story
export const Basic: Story = {
    args: {
        open: false,
        onOpenChange: fn(),
    },
    render: (props) => (
        <Collapsible.Root {...props} className="collapsible-root">
            <div className="collapsible-container">
                <Collapsible.Trigger className="collapsible-trigger" data-testid="trigger">
                    <span>Click to expand</span>
                    <Collapsible.Indicator>
                        <ChevronDown />
                    </Collapsible.Indicator>
                </Collapsible.Trigger>
                <Collapsible.Content className="collapsible-content" data-testid="content">
                    <p>This is the collapsible content. It can contain any elements.</p>
                </Collapsible.Content>
            </div>
        </Collapsible.Root>
    ),
    play: scenarios.basic,
};

// Multiple Sections Story
const sections = [
    { id: 1, title: 'Section 1', content: 'Content for section 1' },
    { id: 2, title: 'Section 2', content: 'Content for section 2' },
    { id: 3, title: 'Section 3', content: 'Content for section 3' },
];

export const MultipleSections: Story = {
    render: (props) => (
        <div className="collapsible-root collapsible-group">
            {sections.map((section) => (
                <Collapsible.Root {...props} key={section.id}>
                    <div className="collapsible-container">
                        <Collapsible.Trigger className="collapsible-trigger">
                            <span>{section.title}</span>
                            <Collapsible.Indicator>
                                <ChevronDown />
                            </Collapsible.Indicator>
                        </Collapsible.Trigger>
                        <Collapsible.Content className="collapsible-content">
                            <p>{section.content}</p>
                        </Collapsible.Content>
                    </div>
                </Collapsible.Root>
            ))}
        </div>
    ),
};

// Custom Styled Story
export const CustomStyled: Story = {
    args: { open: true },
    render: (props) => (
        <Collapsible.Root {...props} className="collapsible-root">
            <div className="collapsible-container collapsible-custom">
                <Collapsible.Trigger className="collapsible-trigger">
                    <span>Custom styled collapsible</span>
                    <Collapsible.Indicator>
                        <ChevronDown />
                    </Collapsible.Indicator>
                </Collapsible.Trigger>
                <Collapsible.Content className="collapsible-content">
                    <p>This collapsible features custom styling with a blue theme.</p>
                </Collapsible.Content>
            </div>
        </Collapsible.Root>
    ),
};

// Nested Collapsible Story
export const Nested: Story = {
    args: { open: true },
    render: (props) => (
        <Collapsible.Root {...props} className="collapsible-root">
            <div className="collapsible-container">
                <Collapsible.Trigger className="collapsible-trigger">
                    <span>Outer section</span>
                    <Collapsible.Indicator>
                        <ChevronDown />
                    </Collapsible.Indicator>
                </Collapsible.Trigger>
                <Collapsible.Content className="collapsible-content">
                    <p className="mb-2">Outer content</p>
                    <Collapsible.Root {...props}>
                        <div className="collapsible-container">
                            <Collapsible.Trigger className="collapsible-trigger">
                                <span>Inner section</span>
                                <Collapsible.Indicator>
                                    <ChevronDown />
                                </Collapsible.Indicator>
                            </Collapsible.Trigger>
                            <Collapsible.Content className="collapsible-content">
                                <p>Inner content</p>
                            </Collapsible.Content>
                        </div>
                    </Collapsible.Root>
                </Collapsible.Content>
            </div>
        </Collapsible.Root>
    ),
};

// Controlled Story
export const Controlled: Story = {
    args: { controllable: true },
    render: ({ open, onOpenChange, ...rest }) => {
        const [isOpen, setIsOpen] = React.useState(open);

        return (
            <Collapsible.Root
                {...rest}
                className="collapsible-root"
                open={isOpen}
                onOpenChange={(details) => setIsOpen(details.open)}
            >
                <div className="collapsible-container">
                    <Collapsible.Trigger className="collapsible-trigger">
                        <span>Controlled collapsible</span>
                        <Collapsible.Indicator>
                            <ChevronDown />
                        </Collapsible.Indicator>
                    </Collapsible.Trigger>
                    <Collapsible.Content className="collapsible-content">
                        <p>This is a controlled collapsible component.</p>
                        <button onClick={() => setIsOpen(false)} className="close-button">
                            Close from content
                        </button>
                    </Collapsible.Content>
                </div>
            </Collapsible.Root>
        );
    },
    tags: ['skip-test-runner'],
};
