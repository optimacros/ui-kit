import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@optimacros-ui/kit';
import { ICONS_MAP } from '@optimacros-ui/themes';
import { Grid } from '@optimacros-ui/grid';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Icon } from './index';
import * as scenarios from './__tests__/scenarios';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description:
            'Icon name. Might be either a string (material-ui or ui-kit icon id) or custom element',
        table: { type: { summary: 'string | ReactNode' } },
    },
    style: {
        control: 'object',
        description: 'Add styles to component.',
    },
    rotate: {
        control: 'number',
        description: 'Rotation angle',
        table: { defaultValue: { summary: '0' } },
    },
    size: {
        control: 'number',
        description: 'Size as spacing variable',
        table: { defaultValue: { summary: 'undefined' } },
    },
    color: {
        control: 'text',
        description: 'Svg fill/text color',
    },
};

const meta: Meta<typeof Icon> = {
    title: 'UI Kit core/Icon',
    component: Icon,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
    args: {
        value: 'add',
    },
    tags: ['skip-test-runner'],
};

export const IconList: Story = {
    render: () => {
        const onClickHandler = (icon: keyof typeof ICONS_MAP) => {
            navigator.clipboard.writeText(icon);
        };

        return (
            <div style={{ fontSize: '32px' }}>
                <Text.Paragraph style={{ margin: '2rem', opacity: '60%' }}>
                    The icon name is copied when you click on it
                </Text.Paragraph>
                <Grid.Root cols="6" gap="16">
                    {Object.values(ICONS_MAP).map((icon) => (
                        <div
                            key={icon}
                            onClick={() => onClickHandler(icon)}
                            style={{
                                border: '1px solid transparent',
                                borderRadius: '4px',
                                padding: '8px',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s ease',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = '#007bff';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <Flex direction="column" gap="4" align="center">
                                <Icon value={icon} />
                                <div
                                    style={{
                                        fontSize: '16px',
                                        opacity: '60%',
                                        textAlign: 'center',
                                    }}
                                >
                                    {icon}
                                </div>
                            </Flex>
                        </div>
                    ))}
                </Grid.Root>
            </div>
        );
    },
    play: scenarios.iconList,
};

export const CustomElement: Story = {
    args: {
        size: 10,
        value: <span>I am an icon not span</span>,
    },
};

export const CustomStyles: Story = {
    args: {
        value: 'add',
        rotate: 45,
        size: 8,
        color: 'green',
        style: { border: '1px solid black' },
    },
};

export const WithTooltip: Story = {
    args: { value: 'info' },
    render: (props) => {
        return (
            <Tooltip.Root openDelay={0}>
                <Tooltip.Trigger asChild>
                    <Icon {...props} />
                </Tooltip.Trigger>
                <Tooltip.Content>additional information</Tooltip.Content>
            </Tooltip.Root>
        );
    },
    tags: ['skip-test-runner'],
};
