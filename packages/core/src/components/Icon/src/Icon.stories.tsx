//@ts-nocheck

import { ArgTypes, Meta } from '@storybook/react';
import { Tooltip } from '@optimacros-ui/kit';
import { ICONS_MAP } from '@optimacros-ui/themes';
import { Grid } from '@optimacros-ui/grid';
import { Flex } from '@optimacros-ui/flex';
import { Text } from '@optimacros-ui/text';
import { Popover } from '@optimacros-ui/popover';
import { Toolbar } from '@optimacros-ui/toolbar';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';

import { Icon } from './index';

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
    title: 'UI Kit core/Icon',
    component: Icon,
    tags: ['autodocs'],
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
        <Tooltip.Root openDelay={0}>
            <Tooltip.Trigger asChild>
                <Icon value="info" />
            </Tooltip.Trigger>
            <Tooltip.Content>additional information</Tooltip.Content>
        </Tooltip.Root>
    );
};

export const WithButton = () => {
    return (
        <Popover.Root>
            <Flex align="center">
                <Text.Paragraph>Support cases</Text.Paragraph>
                <Popover.Trigger asChild>
                    <IconButton> info </IconButton>
                </Popover.Trigger>
            </Flex>
            <Popover.Positioner>
                <Popover.Content>
                    <Popover.Title> Info </Popover.Title>
                    <Popover.Description>
                        This represents your entire organization`s supports cases. To view support
                        cases that you have opened, visit the support center.
                    </Popover.Description>
                    <Toolbar.Root isSmall>
                        <Popover.CloseTrigger asChild>
                            <Button>Close</Button>
                        </Popover.CloseTrigger>
                        <Button variant="accent">Learn more</Button>
                    </Toolbar.Root>
                </Popover.Content>
            </Popover.Positioner>
        </Popover.Root>
    );
};
