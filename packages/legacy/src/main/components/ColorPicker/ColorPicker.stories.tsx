import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './index';

const meta: Meta<typeof ColorPicker> = {
    title: 'Legacy/ColorPicker',
    component: ColorPicker,
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
    args: {
        title: 'title',
        name: 'name',
        tooltip: 'tooltip',
        tooltipPosition: 'top',
        color: '000000',
        disableAlpha: true,
        cancelLabel: 'cancel',
        applyLabel: 'apply',
        showSettings: true,
        colorSettingsLabel: 'settings',
        recentColorsLabel: 'recent color',
        presetColors: ['#99A0C0', '#9AB4E4', '#16A8A8', '#610CEF', '#1240ED', '#10FF1E'],
        recentColors: ['#FFE9B4', '#BF83E0', '#1B39E6', '#AA4863', '#4A0ED8', '#06EE74'],
    },
};
