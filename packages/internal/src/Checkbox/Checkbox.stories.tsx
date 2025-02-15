import { useState } from 'react';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './index';

const argTypes: Partial<ArgTypes> = {
    label: {
        control: 'text',
        description: 'The text to use for the label element.',
    },
    name: {
        control: 'text',
        description: 'Value for `name` input attribute.',
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    checked: {
        control: 'boolean',
        description: ' If `true`, component will be checked.',
    },
    tooltipLabel: {
        control: 'text',
        description: 'The text string to use for the tooltip.',
    },
    tooltipDelay: {
        control: 'number',
        description: 'Amount of time in milliseconds spent before the tooltip is visible.',
    },
    tooltipPosition: {
        control: 'radio',
        options: ['vertical', 'horizontal', 'bottom', 'top', 'left', 'right'],
        table: {
            defaultValue: { summary: 'vertical' },
        },
        description: 'Determines the position of the tooltip.',
    },
    tooltipOffset: {
        control: 'number',
        description:
            ' If `tooltipPosition` - `vertical`, `bottom` or `top`, the tooltip moves relative to its axis.',
    },
    className: {
        table: { disable: true },
    },
    theme: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
    style: {
        table: { disable: true },
    },
    onClick: {
        table: { disable: true },
    },
    onChange: {
        table: { disable: true },
    },
    onMouseEnter: {
        table: { disable: true },
    },
    onMouseLeave: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Checkbox> = {
    title: 'UI Kit internal/Checkbox',
    component: Checkbox,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
    parameters: {
        layout: 'centered',
    },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
    render: (args) => <Checkbox {...args} />,
    args: {
        name: 'Basic',
        onChange: undefined,
    },
};

export const Checked: Story = {
    args: {
        checked: true,
        onChange: undefined,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        onChange: undefined,
    },
};

export const Label: Story = {
    args: {
        label: 'Label',
        checked: true,
        onChange: undefined,
    },
};

export const WithTooltip: Story = {
    args: {
        onChange: undefined,
        label: 'Label',
        tooltipLabel: 'Tooltip text',
        tooltipDelay: 50,
        tooltipPosition: 'bottom',
        tooltipOffset: 0,
    },
};
// Dynamic tooltip content based on checkbox state
export const DynamicTooltip: Story = {
    render: (args) => {
        const [isChecked, setIsChecked] = useState(false);

        return (
            <Checkbox
                {...args}
                checked={isChecked}
                tooltipLabel={isChecked ? 'Click to deactivate' : 'Click to activate'}
                onChange={(checked) => setIsChecked(checked)}
            />
        );
    },
    args: {
        label: 'Dynamic Tooltip',
        tooltipPosition: 'right',
        tooltipDelay: 200,
    },
};

// Interactive group with state management
export const InteractiveGroup: Story = {
    render: () => {
        const [selections, setSelections] = useState({
            option1: false,
            option2: false,
            option3: false,
        });

        const handleChange = (name: string) => (checked) => {
            setSelections((prev) => ({
                ...prev,
                [name]: checked,
            }));
        };

        const allSelected = Object.values(selections).every(Boolean);

        return (
            <div className="flex flex-col gap-4">
                <Checkbox
                    label="Select All"
                    checked={allSelected}
                    onChange={(checked) => {
                        setSelections({
                            option1: checked,
                            option2: checked,
                            option3: checked,
                        });
                    }}
                    tooltipLabel={allSelected ? 'Deselect all options' : 'Select all options'}
                    tooltipPosition="top"
                />
                <div className="ml-4 flex flex-col gap-2">
                    <Checkbox
                        label="Option 1"
                        checked={selections.option1}
                        onChange={handleChange('option1')}
                        tooltipLabel="First option"
                        tooltipPosition="right"
                    />
                    <Checkbox
                        label="Option 2"
                        checked={selections.option2}
                        onChange={handleChange('option2')}
                        tooltipLabel="Second option"
                        tooltipPosition="right"
                    />
                    <Checkbox
                        label="Option 3"
                        checked={selections.option3}
                        onChange={handleChange('option3')}
                        tooltipLabel="Third option"
                        tooltipPosition="right"
                    />
                </div>
            </div>
        );
    },
};

// Progressive disclosure pattern
export const ProgressiveDisclosure: Story = {
    render: () => {
        const [showAdvanced, setShowAdvanced] = useState(false);
        const [settings, setSettings] = useState({
            basic: false,
            advanced1: false,
            advanced2: false,
        });

        return (
            <div className="flex flex-col gap-4">
                <Checkbox
                    label="Basic Setting"
                    checked={settings.basic}
                    onChange={(checked) =>
                        setSettings((prev) => ({
                            ...prev,
                            basic: checked,
                        }))
                    }
                    tooltipLabel="Enable basic functionality"
                    tooltipPosition="right"
                />
                <Checkbox
                    label="Show Advanced Settings"
                    checked={showAdvanced}
                    onChange={(checked) => setShowAdvanced(checked)}
                    tooltipLabel="Display additional configuration options"
                    tooltipPosition="right"
                />
                {showAdvanced && (
                    <div className="ml-4 flex flex-col gap-2">
                        <Checkbox
                            label="Advanced Setting 1"
                            checked={settings.advanced1}
                            onChange={(checked) =>
                                setSettings((prev) => ({
                                    ...prev,
                                    advanced1: checked,
                                }))
                            }
                            tooltipLabel="Enable advanced feature 1"
                            tooltipPosition="right"
                            disabled={!settings.basic}
                        />
                        <Checkbox
                            label="Advanced Setting 2"
                            checked={settings.advanced2}
                            onChange={(checked) =>
                                setSettings((prev) => ({
                                    ...prev,
                                    advanced2: checked,
                                }))
                            }
                            tooltipLabel="Enable advanced feature 2"
                            tooltipPosition="right"
                            disabled={!settings.basic}
                        />
                    </div>
                )}
            </div>
        );
    },
};

// Conditional tooltip content and styling
export const ConditionalTooltip: Story = {
    render: () => {
        const [status, setStatus] = useState({
            enabled: false,
            processing: false,
        });

        const handleToggle = (checked) => {
            if (checked) {
                setStatus({ enabled: checked, processing: true });
                setTimeout(() => {
                    setStatus({ enabled: checked, processing: false });
                }, 1500);
            } else {
                setStatus({ enabled: checked, processing: false });
            }
        };

        const getTooltipContent = () => {
            if (status.processing) return 'Processing...';
            if (status.enabled) return 'Click to disable feature';
            return 'Click to enable feature';
        };

        return (
            <Checkbox
                label="Toggle Feature"
                checked={status.enabled}
                onChange={handleToggle}
                disabled={status.processing}
                tooltipLabel={getTooltipContent()}
                tooltipPosition="right"
                tooltipDelay={status.processing ? 0 : 200}
            />
        );
    },
};

// Complex validation pattern
export const ValidationPattern: Story = {
    render: () => {
        const [acceptedTerms, setAcceptedTerms] = useState({
            terms: false,
            privacy: false,
            updates: false,
        });

        const [hasInteracted, setHasInteracted] = useState({
            terms: false,
            privacy: false,
        });

        const handleChange = (field: keyof typeof acceptedTerms) => (checked) => {
            setAcceptedTerms((prev) => ({
                ...prev,
                [field]: checked,
            }));

            if (field !== 'updates') {
                setHasInteracted((prev) => ({
                    ...prev,
                    [field]: true,
                }));
            }
        };

        const getTooltipForField = (field: 'terms' | 'privacy') => {
            if (!hasInteracted[field]) return 'Required';
            if (!acceptedTerms[field]) return 'You must accept this to continue';
            return 'Accepted';
        };

        return (
            <div className="flex flex-col gap-4">
                <Checkbox
                    label="I accept the Terms of Service"
                    checked={acceptedTerms.terms}
                    tooltipLabel={getTooltipForField('terms')}
                    tooltipPosition="right"
                    tooltipDelay={0}
                    onChange={handleChange('terms')}
                />
                <Checkbox
                    label="I accept the Privacy Policy"
                    checked={acceptedTerms.privacy}
                    tooltipLabel={getTooltipForField('privacy')}
                    tooltipPosition="right"
                    tooltipDelay={0}
                    onChange={handleChange('privacy')}
                />
                <Checkbox
                    label="I want to receive updates (optional)"
                    checked={acceptedTerms.updates}
                    tooltipLabel="You can change this later in settings"
                    tooltipPosition="right"
                    onChange={handleChange('updates')}
                />
            </div>
        );
    },
};
