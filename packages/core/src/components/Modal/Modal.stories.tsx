import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';

const argTypes: Partial<ArgTypes> = {
    isOpen: {
        control: 'boolean',
        description: 'If `true`, modal opened.',
    },
    compact: {
        control: 'boolean',
        description: 'Modal size',
    },
};

const meta: Meta<typeof Modal> = {
    title: 'UI Kit core/Modal',
    component: Modal,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
    args: {
        children: 'Basic',
        isOpen: true,
        title: 'modal',
        compact: false,
    },
};
