import { ArgTypes, Meta } from '@storybook/react';

import { ButtonMenu } from './index';
import { Icon } from '@optimacros-ui/icon';
import type { menu } from '@optimacros-ui/menu';
import { createMenuItems } from '@optimacros-ui/menu/src/mock';
import { Tooltip } from '@optimacros-ui/tooltip';

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    visible: {
        control: 'boolean',
        description: ' If `true`, the Menu Dropdown will be visible by default.',
    },
    uppercase: {
        control: 'boolean',
        description: 'If `true`, the text inside the ButtonMenu will be in uppercase.',
    },
    showOnlyIcon: {
        control: 'boolean',
        description: 'If `true` and icon used - only icon will be visible in the ButtonMenu.',
    },
    arrowUp: {
        control: 'boolean',
        description: 'If `true`, dropdown arrow icon will point up.',
    },
    label: {
        control: 'text',
        description: 'The text string to use for the name of the button.',
    },
    icon: {
        control: 'text',
        description: 'Value of the icon (See Font Icon Component).',
    },
    tooltip: {
        control: 'text',
        description: 'The text string to use for the tooltip.',
    },
    tooltipDelay: {
        control: 'number',
        description: 'Amount of time in milliseconds spent before the tooltip is visible.',
    },
    tooltipPosition: {
        control: 'radio',
        options: ['vertical', 'horizontal', 'bottom', 'top', 'left', 'right'],
        table: {
            defaultValue: { summary: 'vertical' },
        },
        description: 'Determines the position of the tooltip.',
    },
    tooltipOffset: {
        control: 'number',
        description:
            ' If `tooltipPosition` - `vertical`, `bottom` or `top`, the tooltip moves relative to its axis.',
    },
    className: {
        table: { disable: true },
    },
    theme: {
        table: { disable: true },
    },
    menuRootContainerClassName: {
        table: { disable: true },
    },
    classNameDropdownContainer: {
        table: { disable: true },
    },
    onVisibleChange: {
        table: { disable: true },
    },
    dataName: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
};

const meta: Meta<typeof ButtonMenu> = {
    title: 'UI Kit core/ButtonMenu',
    argTypes,
};
export default meta;

const menuItems: Array<menu.ItemProps> = createMenuItems(10);

export const Basic = () => {
    return (
        <ButtonMenu.Root>
            <ButtonMenu.Trigger>
                <>
                    <Icon value="print" />
                    Menu
                    <Icon value="arrow_drop_down" />
                </>
            </ButtonMenu.Trigger>
            <ButtonMenu.Content>
                {menuItems.map((v) => (
                    <ButtonMenu.Item {...v} />
                ))}
            </ButtonMenu.Content>
        </ButtonMenu.Root>
    );
};

export const Disabled = () => {
    return (
        <ButtonMenu.Root disabled>
            <ButtonMenu.Trigger>
                <>
                    <Icon value="print" />
                    Menu
                    <Icon value="arrow_drop_down" />
                </>
            </ButtonMenu.Trigger>
            <ButtonMenu.Content>
                {menuItems.map((v) => (
                    <ButtonMenu.Item {...v} />
                ))}
            </ButtonMenu.Content>
        </ButtonMenu.Root>
    );
};

export const Uppercase = () => {
    return (
        <ButtonMenu.Root>
            <ButtonMenu.Trigger uppercase>
                <>
                    <Icon value="print" />
                    Menu
                    <Icon value="arrow_drop_down" />
                </>
            </ButtonMenu.Trigger>
            <ButtonMenu.Content>
                {menuItems.map((v) => (
                    <ButtonMenu.Item {...v} />
                ))}
            </ButtonMenu.Content>
        </ButtonMenu.Root>
    );
};

export const WithTooltip = () => {
    return (
        <ButtonMenu.Root>
            <Tooltip.Root
                openDelay={0}
                closeDelay={0}
                positioning={{ offset: { crossAxis: 0, mainAxis: 0 }, placement: 'bottom-start' }}
            >
                <Tooltip.Trigger asChild>
                    <div>
                        <ButtonMenu.Trigger uppercase>
                            <>
                                <Icon value="print" />
                                Menu
                                <Icon value="arrow_drop_down" />
                            </>
                        </ButtonMenu.Trigger>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content>some info there</Tooltip.Content>
            </Tooltip.Root>
            <ButtonMenu.Content>
                {menuItems.map((v) => (
                    <ButtonMenu.Item {...v} />
                ))}
            </ButtonMenu.Content>
        </ButtonMenu.Root>
    );
};
