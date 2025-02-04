//@ts-nocheck

import { Meta, StoryObj } from '@storybook/react';

import { Menu, MenuItem, SubMenu } from '@optimacros-ui/kit-internal';
import { action } from '@storybook/addon-actions';

const Wrapper = ({ children }: { children }) => (
    <div style={{ width: '100%', height: '100vh', marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof Menu> = {
    title: 'UI Kit internal/Menu/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof Menu>;

export const Basic = (props) => {
    return (
        <Menu>
            <MenuItem label="1" key="1">
                1
            </MenuItem>
            <SubMenu label="2" key="2">
                <MenuItem label="2-1" key="2-1" disabled>
                    2-1
                </MenuItem>
                <SubMenu label="3" key="3">
                    <MenuItem label="3-1" key="3-1">
                        3-1
                    </MenuItem>
                    <SubMenu label="4" key="4">
                        <MenuItem label="4-1" key="4-1">
                            4-1
                        </MenuItem>
                        <MenuItem label="4-2" key="4-2">
                            4-2
                        </MenuItem>
                        <MenuItem label="4-3" key="4-3">
                            4-3
                        </MenuItem>
                        <MenuItem label="4-4" key="4-4">
                            4-4
                        </MenuItem>
                        <SubMenu label="5" key="5">
                            <MenuItem label="5-1" key="5-1">
                                5-1
                            </MenuItem>
                            <MenuItem label="5-2" key="5-2">
                                5-2
                            </MenuItem>
                            <SubMenu label="6" key="6">
                                <MenuItem label="6-1" key="6-1">
                                    6-1
                                </MenuItem>
                                <MenuItem label="6-2" key="6-2">
                                    6-2
                                </MenuItem>
                                <SubMenu label="7" key="7">
                                    <MenuItem label="7-1" key="7-1">
                                        7-1
                                    </MenuItem>
                                    <MenuItem label="7-2" key="7-2">
                                        7-2
                                    </MenuItem>
                                    <MenuItem label="7-3" key="7-3">
                                        7-3
                                    </MenuItem>
                                    <MenuItem label="7-4" key="7-4">
                                        7-4
                                    </MenuItem>
                                </SubMenu>
                                <MenuItem label="6-3" key="6-3">
                                    6-3
                                </MenuItem>
                                <MenuItem label="6-4" key="6-4">
                                    6-4
                                </MenuItem>
                            </SubMenu>
                            <MenuItem label="5-3" key="5-3">
                                5-3
                            </MenuItem>
                            <MenuItem label="5-4" key="5-4">
                                5-4
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                </SubMenu>
            </SubMenu>
        </Menu>
    );
};

export const SimpleMenu: Story = {
    render: () => (
        <Menu>
            <MenuItem title="Home" key="home" onClick={action('clicked Home')}>
                Home
            </MenuItem>
            <MenuItem title="Profile" key="profile" onClick={action('clicked Profile')}>
                Profile
            </MenuItem>
            <MenuItem title="Settings" key="settings" onClick={action('clicked Settings')}>
                Settings
            </MenuItem>
        </Menu>
    ),
};

export const WithLabelsAndValues: Story = {
    render: () => (
        <Menu>
            <MenuItem
                title="Language"
                key="language"
                label="Select your preferred language"
                value="English"
                onClick={action('clicked Language')}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                    <span>Language</span>
                    <span style={{ color: '#6b7280' }}>English</span>
                </div>
            </MenuItem>
            <MenuItem
                title="Theme"
                key="theme"
                label="Choose application theme"
                value="Light"
                onClick={action('clicked Theme')}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                    <span>Theme</span>
                    <span style={{ color: '#6b7280' }}>Light</span>
                </div>
            </MenuItem>
        </Menu>
    ),
};

export const UserMenu: Story = {
    render: () => (
        <Menu>
            <MenuItem
                title="Profile"
                key="profile"
                label="View and edit profile"
                onClick={action('clicked Profile')}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
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
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            john@example.com
                        </div>
                    </div>
                </div>
            </MenuItem>
            <MenuItem
                title="Account"
                key="account"
                label="Manage your account"
                onClick={action('clicked Account')}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>⚙️</span>
                    <span>Account Settings</span>
                </div>
            </MenuItem>
            <MenuItem title="Logout" key="logout" onClick={action('clicked Logout')}>
                <div
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}
                >
                    <span>🚪</span>
                    <span>Sign Out</span>
                </div>
            </MenuItem>
        </Menu>
    ),
};

export const NotificationMenu: Story = {
    render: () => (
        <Menu>
            <MenuItem
                title="Messages"
                key="messages"
                label="3 unread messages"
                value="3"
                onClick={action('clicked Messages')}
            >
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
            </MenuItem>
            <MenuItem
                title="Tasks"
                key="tasks"
                label="5 pending tasks"
                value="5"
                onClick={action('clicked Tasks')}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '200px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📋</span>
                        <span>Tasks</span>
                    </div>
                    <div
                        style={{
                            backgroundColor: '#eab308',
                            color: 'white',
                            borderRadius: '9999px',
                            padding: '2px 8px',
                            fontSize: '0.75rem',
                        }}
                    >
                        5
                    </div>
                </div>
            </MenuItem>
        </Menu>
    ),
};

export const SettingsMenu: Story = {
    render: () => (
        <Menu>
            <MenuItem
                title="Storage"
                key="storage"
                label="Storage usage information"
                value="75%"
                onClick={action('clicked Storage')}
            >
                <div style={{ width: '200px', padding: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Storage Used</span>
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
            </MenuItem>
            <MenuItem
                title="Notifications"
                key="notifications"
                label="Notification preferences"
                onClick={action('clicked Notifications')}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🔔</span>
                    <span>Notification Settings</span>
                </div>
            </MenuItem>
            <MenuItem
                title="Privacy"
                key="privacy"
                label="Privacy and security"
                onClick={action('clicked Privacy')}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🔒</span>
                    <span>Privacy Settings</span>
                </div>
            </MenuItem>
        </Menu>
    ),
};

export const AccountActions: Story = {
    render: () => (
        <Menu>
            <MenuItem
                title="Upgrade"
                key="upgrade"
                label="Upgrade to Pro"
                onClick={action('clicked Upgrade')}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#3b82f6',
                    }}
                >
                    <span>⭐</span>
                    <span>Upgrade to Pro</span>
                </div>
            </MenuItem>
            <MenuItem
                title="Export"
                key="export"
                label="Export your data"
                onClick={action('clicked Export')}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📤</span>
                    <span>Export Data</span>
                </div>
            </MenuItem>
            <MenuItem
                title="Delete"
                key="delete"
                label="Delete your account"
                onClick={action('clicked Delete')}
            >
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
                </div>
            </MenuItem>
        </Menu>
    ),
};
