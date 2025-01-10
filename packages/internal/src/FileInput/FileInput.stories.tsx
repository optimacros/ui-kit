import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FileInput } from './index';

const argTypes: Partial<ArgTypes> = {};

const meta: Meta<typeof FileInput> = {
    title: 'UI Kit internal/FileInput',
    component: FileInput,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof FileInput>;

export const Base: Story = {
    args: {
        accept: 'image/*',
    },
};

export const DefaultFile: Story = {
    args: {
        accept: 'text/*',
        state: {
            file: {
                lastModified: 11,
                name: 'Default file',
                size: 2000000000000,
            },
            reset: () => {},
        },
        filePreview: true,
    },
};
