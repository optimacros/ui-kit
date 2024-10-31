import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { ToggleIcon } from './ToggleIcon';

const meta: Meta<typeof ToggleIcon> = {
    component: ToggleIcon,
    title: 'UI Kit core/ToggleIcon',
    argTypes: {
        isOpen: {
            description: 'Start status',
            control: 'boolean',
        },
        wrapperClassName: {
            description: 'Custom styles for wrapper',
            control: 'object',
        },
        iconClassName: {
            description: 'Custom styles for icon',
            control: 'object',
        },
        handleClick: {
            description: 'Click handler',
            control: 'object',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ToggleIcon>;

const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{ backgroundColor: 'var(--primary-color)', width: 'fit-content', color: '#fff' }}
        >
            {children}
        </div>
    );
};

export const Basic: Story = {
    render: ({ ...args }) => {
        const [value, setValue] = useState<boolean>(true);

        return <ToggleIcon {...args} isOpen={value} handleClick={() => setValue((v) => !v)} />;
    },
    decorators: [(story) => <Wrapper>{story()}</Wrapper>],
};
