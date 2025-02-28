import { Toast } from '.';
import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import * as examples from './examples';
import { ComponentProps } from 'react';

const argTypes: Partial<ArgTypes<ComponentProps<typeof Toast.RootProvider>>> = {};

const meta: Meta<typeof Toast.RootProvider> = {
    title: 'UI Kit core/Toast/Toast',
    component: Toast.RootProvider,
    argTypes,
    tags: ['skip-test-runner'],
};

export default meta;

type Story = StoryObj<typeof Toast.RootProvider>;

export const Basic: Story = {
    render: examples.Basic,
};
