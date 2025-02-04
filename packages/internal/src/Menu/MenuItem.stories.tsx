import type { Meta, StoryObj } from '@storybook/react';
import { Menu, MenuItem } from '.';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof MenuItem> = {
    title: 'UI Kit internal/Menu/MenuItem',
    component: MenuItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'The title of the menu item',
        },
        key: {
            control: 'text',
            description: 'Unique identifier for the menu item',
        },
        value: {
            control: 'text',
            description: 'Optional value associated with the item',
        },
        onClick: {
            description: 'Function called when menu item is clicked',
        },
        children: {
            description: 'Content to be rendered inside the menu item',
        },
    },
    decorators: [
        (Story) => {
            return (
                <Menu>
                    <Story />
                </Menu>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

// Basic MenuItem with just title and key
export const Basic: Story = {
    args: {
        title: 'Basic Menu Item',
        key: 'basic',
        onClick: action('onClick'),
        children: 'Basic Menu Item',
    },
};

// MenuItem with label for additional context
export const WithLabel: Story = {
    args: {
        title: 'Settings',
        key: 'settings',
        label: 'Application preferences',
        onClick: action('onClick'),
        children: (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Settings</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Application preferences
                </span>
            </div>
        ),
    },
};

// MenuItem with value showing selected option
export const WithValue: Story = {
    args: {
        title: 'Language',
        key: 'language',
        label: 'Current language',
        value: 'English',
        onClick: action('onClick'),
        children: (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                <span>Language</span>
                <span style={{ color: '#6b7280' }}>English</span>
            </div>
        ),
    },
};

// MenuItem with icon and text
export const WithIcon: Story = {
    args: {
        title: 'Notifications',
        key: 'notifications',
        label: 'Manage notifications',
        onClick: action('onClick'),
        children: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🔔</span>
                <span>Notifications</span>
            </div>
        ),
    },
};

// MenuItem with complex content
export const ComplexContent: Story = {
    args: {
        title: 'Profile',
        key: 'profile',
        label: 'User profile information',
        onClick: action('onClick'),
        children: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px' }}>
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    👤
                </div>
                <div>
                    <div style={{ fontWeight: 'bold' }}>John Doe</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>john@example.com</div>
                </div>
            </div>
        ),
    },
};

// MenuItem with badge and value
export const WithBadge: Story = {
    args: {
        title: 'Messages',
        key: 'messages',
        label: 'Unread messages',
        value: '3',
        onClick: action('onClick'),
        children: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '200px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✉️</span>
                    <span>Messages</span>
                </div>
                <div
                    style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        borderRadius: '9999px',
                        padding: '2px 8px',
                        fontSize: '0.75rem',
                    }}
                >
                    3
                </div>
            </div>
        ),
    },
};

// MenuItem with progress indicator
export const WithProgress: Story = {
    args: {
        title: 'Upload Progress',
        key: 'upload',
        label: 'File upload status',
        value: '75%',
        onClick: action('onClick'),
        children: (
            <div style={{ width: '200px', padding: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Uploading file...</span>
                    <span>75%</span>
                </div>
                <div
                    style={{
                        height: '4px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '2px',
                        marginTop: '8px',
                    }}
                >
                    <div
                        style={{
                            width: '75%',
                            height: '100%',
                            backgroundColor: '#3b82f6',
                            borderRadius: '2px',
                        }}
                    />
                </div>
            </div>
        ),
    },
};

// MenuItem with destructive action
export const Destructive: Story = {
    args: {
        title: 'Delete Account',
        key: 'delete',
        label: 'Permanently delete your account',
        onClick: action('onClick'),
        children: (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ef4444',
                }}
            >
                <span>🗑️</span>
                <span>Delete Account</span>
                <span
                    style={{
                        fontSize: '0.875rem',
                        color: '#ef4444',
                        opacity: 0.8,
                    }}
                >
                    (Permanent Action)
                </span>
            </div>
        ),
    },
};

// MenuItem with keyboard shortcut
export const WithShortcut: Story = {
    args: {
        title: 'Save',
        key: 'save',
        label: 'Save changes',
        onClick: action('onClick'),
        children: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '200px',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>💾</span>
                    <span>Save</span>
                </div>
                <span
                    style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        fontFamily: 'monospace',
                    }}
                >
                    ⌘ + S
                </span>
            </div>
        ),
    },
};
