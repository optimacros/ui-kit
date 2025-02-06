import { ArgTypes, Meta } from '@storybook/react';
import { ICONS_MAP } from '@optimacros-ui/themes';
import { Grid } from '@optimacros-ui/grid';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Popover } from '@optimacros-ui/popover';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Icon } from './index';
import { Tooltip } from '../Tooltip';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'text',
        description: 'Icon name',
    },
    style: {
        control: 'object',
        description: 'Add styles to component.',
    },
};

export default {
    title: 'UI Kit internal/Icon',
    component: Icon,
    tags: ['autodocs', 'skip-test-runner'],
    argTypes,
} as Meta;

export const Basic = () => {
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
};

export const CustomStyles = {
    args: {
        value: 'add',
        style: { border: '1px solid black' },
    },
};

export const WithTooltip = () => {
    return (
        <Tooltip
            composedComponent={Icon}
            composedComponentProps={{
                value: 'info',
            }}
            tooltip={<>some content</>}
            tooltipDelay={300}
        />
    );
};

export const WithButton = () => {
    return (
        <Popover.Root>
            <Flex align="center">
                <Text.Paragraph>Support cases</Text.Paragraph>
                <Popover.Trigger asChild>
                    <IconButton icon="info" />
                </Popover.Trigger>
            </Flex>
            <Popover.Positioner>
                <Popover.Content>
                    <Flex align="start" gap="2" width="300px" direction="column">
                        <Popover.Title> Info </Popover.Title>
                        <Popover.Description>
                            This represents your entire organization`s supports cases. To view
                            support cases that you have opened, visit the support center.
                        </Popover.Description>
                        <Flex align="center" gap="1" justify="end">
                            <Popover.CloseTrigger asChild>
                                <Button variant="transparent">Close</Button>
                            </Popover.CloseTrigger>
                            <Button variant="primary">Learn more</Button>
                        </Flex>
                    </Flex>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    );
};
