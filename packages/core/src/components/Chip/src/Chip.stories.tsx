import { ComponentProps, useState } from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Text } from '@optimacros-ui/text';
import { Flex } from '@optimacros-ui/flex';
import { Modal } from '@optimacros-ui/modal';
import { Chip } from './index';
import { Meta, StoryFn, ArgTypes, StoryObj } from '@storybook/react';

const Wrapper = ({ children }: { children }) => <div style={{ width: '130px' }}>{children}</div>;

const argTypes: ArgTypes<ComponentProps<typeof Chip.Root>> = {
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
};

const meta: Meta<typeof Chip.Root> = {
    title: 'UI Kit core/Chip',
    component: Chip.Root,
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

type Story = StoryFn<typeof Chip.Root>;

export const Base: Story = () => {
    return <Chip.Root>Base</Chip.Root>;
};

export const Deletable: Story = () => {
    const [isChip, setIsChip] = useState<boolean>(true);
    const onClickHandle = () => {
        setIsChip(false);
    };

    return (
        <div>
            {isChip ? (
                <Chip.Root>
                    <Text.Paragraph>Deletable</Text.Paragraph>
                    <Chip.Icon>
                        <Icon value="cancel" onClick={onClickHandle} />
                    </Chip.Icon>
                </Chip.Root>
            ) : null}
        </div>
    );
};

export const WithIcon: Story = () => {
    return (
        <Chip.Root>
            <Chip.Icon>
                <Icon value="face" />
            </Chip.Icon>
            With Icon
        </Chip.Root>
    );
};

export const WithAvatar: Story = () => {
    return (
        <Chip.Root>
            <Chip.Avatar src="/public/default-avatar.svg" />
            With Avatar
        </Chip.Root>
    );
};

export const WithModal: StoryObj<typeof Chip.Root> = {
    render: () => {
        return (
            <Modal.Root>
                <Chip.Root>
                    With Icon
                    <Modal.Trigger>
                        <Chip.Icon>
                            <Icon value="settings" />
                        </Chip.Icon>
                    </Modal.Trigger>
                </Chip.Root>

                <Modal.Content>
                    <Modal.Title>Great modal</Modal.Title>
                    <Modal.CloseTrigger>close</Modal.CloseTrigger>
                </Modal.Content>
            </Modal.Root>
        );
    },
    tags: ['skip-test-runner'],
};

export const Multiple: StoryObj<typeof Chip.Root> = {
    render: () => {
        return (
            <Flex gap="3" wrap="wrap">
                {new Array(10).fill(0).map((_, i) => (
                    <Chip.Root key={i}>Base</Chip.Root>
                ))}
            </Flex>
        );
    },
    tags: ['skip-test-runner'],
};
