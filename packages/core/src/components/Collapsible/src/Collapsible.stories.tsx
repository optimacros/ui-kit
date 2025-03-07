import { ComponentProps, useState } from 'react';
import { Collapsible } from '.';
import { Icon } from '@optimacros-ui/icon';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as scenarios from './__tests__/scenarios';
import { fn } from '@storybook/test';
import { css } from './styles';

const argTypes: ArgTypes<Partial<ComponentProps<typeof Collapsible.Root>>> = {
    open: {
        control: 'boolean',
        description: 'Whether the collapsible is open',
        table: { defaultValue: { summary: 'false' } },
    },
    defaultOpen: {
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
};

const ChevronDown = ({ className }: { className?: string }) => (
    <Icon value="chevron_left" className={className ?? 'collapsible-icon'} />
);

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
    args: {
        open: undefined,
    },
} satisfies Meta<typeof Collapsible.Root>;

export default meta;
type Story = StoryObj<typeof Collapsible.Root>;

// Basic Collapsible Story
export const Basic: Story = {
    args: {
        defaultOpen: false,
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
    args: { defaultOpen: true },
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
    args: { defaultOpen: true },
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
    render: ({ defaultOpen, onOpenChange, ...rest }) => {
        const [isOpen, setIsOpen] = useState(defaultOpen);

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
