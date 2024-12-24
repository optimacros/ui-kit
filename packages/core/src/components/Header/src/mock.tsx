import { Icon } from '@optimacros-ui/kit';

export const headerMenuItems = [
    {
        key: '11',
        value: '11',
        valueText: 'Profile',
        disabled: false,
    },
    {
        key: '12',
        value: '12',
        valueText: (
            <span>
                <Icon value="help_outline" />
                App version
            </span>
        ),
        disabled: false,
    },
    {
        key: '13',
        value: '13',
        valueText: (
            <span>
                <Icon value="settings" />
                Settings
            </span>
        ),
        disabled: false,
    },
    {
        key: '14',
        value: '14',
        valueText: (
            <span>
                <Icon value="input" />
                Log Out
            </span>
        ),
        disabled: false,
    },
];
