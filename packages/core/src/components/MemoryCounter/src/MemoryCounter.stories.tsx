import type { Meta, StoryObj } from '@storybook/react';

import { MemoryCounter } from './MemoryCounter';

const meta: Meta<typeof MemoryCounter> = {
    component: MemoryCounter,
    title: 'UI Kit core/MemoryCounter',
    argTypes: {
        data: {
            description: 'Memory data',
            control: 'object',
        },
        className: { table: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof MemoryCounter>;

export const Basic: Story = {
    args: {
        data: {
            filledSize: '2 gb',
            percentSize: 20,
            freeSize: '5 gb',
            doubleFreeSize: '11 gb',
        },
    },
};
