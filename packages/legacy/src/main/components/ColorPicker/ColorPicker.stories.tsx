import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './index';

const meta: Meta<typeof ColorPicker> = {
    title: 'Legacy/ColorPicker',
    component: ColorPicker,
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
    args: { title: 'title', name: 'name', tooltip: 'tooltip', tooltipPosition: 'top' },
};
