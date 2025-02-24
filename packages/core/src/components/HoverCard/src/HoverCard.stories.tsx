import { ComponentProps } from 'react';
import { HoverCard } from './index';
import { Meta, StoryFn, ArgTypes } from '@storybook/react';

const Wrapper = ({ children }: { children }) => <div style={{ width: '130px' }}>{children}</div>;

const argTypes: ArgTypes<ComponentProps<typeof HoverCard.Root>> = {
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
};

const meta: Meta<typeof HoverCard.Root> = {
    title: 'UI Kit core/Chip',
    component: HoverCard.Root,
    argTypes,
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export default meta;

type Story = StoryFn<typeof HoverCard.Root>;

export const Base: Story = () => {
    return <HoverCard.Root>Base</HoverCard.Root>;
};
