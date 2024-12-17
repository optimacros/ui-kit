import { ArgTypes, Meta } from '@storybook/react';
import { ICONS_MAP } from '@optimacros-ui/themes';
import { Grid } from '@optimacros-ui/grid';
import { Flex } from '@optimacros-ui/flex';

import { Icon } from './index';

const argTypes: Partial<ArgTypes> = {
    name: {
        control: 'text',
        description: 'Value of the icon. Using `FontIcon` if value string. Or `div` if value node.',
    },
    title: {
        control: 'text',
        description: 'Icon description, visible on icon hover.',
    },
    alt: {
        control: 'text',
        description: 'The text used to set the `aria-label` attribute.',
    },
    style: {
        control: 'object',
        description: 'Add styles to component.',
    },
    className: {
        table: { disable: true },
    },
    onClick: {
        table: { disable: true },
    },
};

export default {
    title: 'UI Kit core/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes,
} as Meta;

export const Basic = {
    args: {
        value: 'close',
        alt: 'close icon',
    },
};

export const IconMap = () => {
    const onClickHandler = (icon) => {
        navigator.clipboard.writeText(icon);
    };

    return (
        <div style={{ fontSize: '32px' }}>
            <Grid.Root cols="6" gap="16">
                {Object.values(ICONS_MAP).map((icon) => (
                    <div key={icon} onDoubleClick={() => onClickHandler(icon)}>
                        <Flex direction="column" gap="4" align="center">
                            <Icon value={icon} />
                            <div style={{ fontSize: '16px', opacity: '60%', background: 'none' }}>
                                {icon}
                            </div>
                        </Flex>
                    </div>
                ))}
            </Grid.Root>
        </div>
    );
};

export const WithTooltip = {
    args: {
        value: 'search',
        title: 'description',
    },
};

export const CustomStyles = {
    args: {
        value: 'add',
        title: 'description',
        style: { border: '1px solid black' },
    },
};
