import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
    title: 'Ui kit core/VisuallyHidden',
    component: VisuallyHidden,
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Basic: Story = {
    args: {
        children: 'This text is hidden visually but available to screen readers',
    },
    render: (args) => (
        <div>
            <p>The text below is visually hidden but accessible to screen readers:</p>
            <VisuallyHidden {...args} />
        </div>
    ),
};

export const WithButton: Story = {
    render: () => (
        <button>
            <VisuallyHidden>Save</VisuallyHidden>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
            </svg>
        </button>
    ),
};

export const WithCustomInput: Story = {
    render: () => (
        <div>
            <label>
                <VisuallyHidden>Search</VisuallyHidden>
                <input
                    type="search"
                    placeholder="Search..."
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #cbd5e1',
                    }}
                />
            </label>
        </div>
    ),
};
