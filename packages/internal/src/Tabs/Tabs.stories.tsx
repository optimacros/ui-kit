import { ArgTypes as ArgTypesType, Meta, StoryObj } from '@storybook/react';
import { Tabs } from './index';
import * as Stories from './stories';

import {
    ArgTypes,
    Description,
    Primary,
    Subtitle,
    Title,
    Stories as StoriesBlock,
} from '@storybook/blocks';

const argTypesTabs: Partial<ArgTypesType> = {
    children: {
        control: false,
        description: 'Content',
        table: {
            type: { summary: 'ReactNode' },
        },
    },
    className: { control: 'text', description: 'Set a custom class styles to style the component' },
    headerClassName: {
        control: 'text',
        description: 'Set a custom class styles to style the Tabs Header',
    },
    contentClassName: {
        control: 'text',
        description: 'Set a custom class styles to style the Tabs Content',
    },
    theme: {
        control: 'object',
        description: 'Theme object with classnames that will be used to style the component',
    },
    active: {
        control: 'number',
        description: 'The value of the currently selected `Tab`',
        table: {
            defaultValue: { summary: '0' },
        },
    },
    draggable: {
        control: 'boolean',
        description: 'If `true`, tabs are draggable',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    hideTabHeader: {
        control: 'boolean',
        description: 'If `true`, header is hidden',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    onChange: {
        control: false,
        description: `Callback function that is fired when the component's active tab changes`,
        table: {
            type: { summary: '(index: number) => void' },
        },
    },
    onTabSwitch: {
        control: false,
        description:
            'Callback function that is fired when `Space` or `Enter` keyboard keys pressed. Почему-то используется вместо onChange. Нужно будет поменять на onChange. Этот метод теперь срабатывает только в случае, описанном выше.',
        table: {
            type: { summary: '(index: number) => void' },
        },
    },
    onTabPositionChange: {
        control: false,
        description:
            'Callback function that is fired when the tab position changing. Я поменял - возвращает готовые табы. Используется в 1 месте, несложно переделать',
        table: {
            type: { summary: '(newTabs: TabProps[]) => void' },
        },
    },
};

const argTypesTab: Partial<ArgTypesType> = {
    children: {
        control: false,
        description: 'Content',
        table: {
            type: { summary: 'ReactNode' },
        },
    },
    className: { control: 'text', description: 'Set a custom class styles to style the component' },
    title: {
        control: 'text',
        description: 'Tab header',
        table: {
            type: { summary: 'string | ReactNode' },
        },
    },
    label: {
        control: 'text',
        description: 'Same as `header`',
        table: {
            type: { summary: 'string | ReactNode' },
        },
    },
    icon: {
        control: 'text',
        description: 'The icon to display',
        table: {
            type: { summary: 'string | ReactNode' },
        },
    },
    counter: {
        control: 'number',
        description: 'Count to show',
    },
    maxCounter: {
        control: 'number',
        description: 'Max count to show',
    },
    nonDraggable: {
        control: 'boolean',
        description: 'If `true`, tab is not draggable',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    isFixed: {
        control: 'boolean',
        description: 'Whether tab fixed or scrollable',
    },
    disabled: {
        control: 'boolean',
        description: 'If `true`, tab is disabled',
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    onHeaderContextMenu: {
        control: false,
        description: 'Callback function that is fired on tab header right click',
        table: {
            type: { summary: '(event: React.MouseEvent<HTMLElement, MouseEvent>) => void' },
        },
    },
    onDoubleClick: {
        control: false,
        description: 'Callback function that is fired on tab header double click',
        table: {
            type: { summary: '(event: React.MouseEvent<HTMLElement, MouseEvent>) => void' },
        },
    },
};

const argTypesTheme: Partial<ArgTypesType> = {
    TabsContainer: {
        control: false,
        description: 'Tabs container class',
    },
    TabContent: {
        control: false,
        description: 'Tabs content class',
    },
    TabContent_Inner: {
        control: false,
        description: 'Tabs content inner class',
    },
    TabHeaderContainer: {
        control: false,
        description: 'Tabs header class',
    },
    TabButton: {
        control: false,
        description: 'Tab button class',
        table: { category: 'Button props' },
    },
    TabButton_Inner: {
        control: false,
        description: 'Tab button inner class',
        table: { category: 'Button props' },
    },
    TabButton_Content: {
        control: false,
        description: 'Tab button content class',
        table: { category: 'Button props' },
    },
    TabButton__active: {
        control: false,
        description: 'Tab button active state class',
        table: { category: 'Button props' },
    },
    TabButton__disabled: {
        control: false,
        description: 'Tab button disabled state class',
        table: { category: 'Button props' },
    },
    TabButton__draggable: {
        control: false,
        description: 'Tab button being dragged class',
        table: { category: 'Button props' },
    },
};

const meta: Meta<typeof Tabs> = {
    title: 'UI Kit internal/Tabs',
    component: Tabs,
    argTypes: { ...argTypesTabs, ...argTypesTab, ...argTypesTheme },
    excludeStories: ['metaTab'],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Subtitle>Tabs props</Subtitle>
                    <ArgTypes include={Object.keys(argTypesTabs)} />
                    <Subtitle>Tab props</Subtitle>
                    <ArgTypes include={Object.keys(argTypesTab)} />
                    <Subtitle>Theme props</Subtitle>
                    <ArgTypes include={Object.keys(argTypesTheme)} />
                    <StoriesBlock />
                </>
            ),
        },
    },
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
    args: {
        active: 2,
        onChange: undefined,
        className: 'className',
        contentClassName: 'contentClassName',
        headerClassName: 'headerClassName',
        theme: {
            TabsContainer: 'TabsContainer',
            TabContent: 'TabContent',
            TabContent_Inner: 'TabContent_Inner',
            TabHeaderContainer: 'TabHeaderContainer',
            TabButton: 'TabButton',
            TabButton_Inner: 'TabButton_Inner',
            TabButton_Content: 'TabButton_Content',
            TabButton__active: 'TabButton__active',
            TabButton__disabled: 'TabButton__disabled',
            TabButton__draggable: 'TabButton__draggable',
        },
    },
    render: Stories.Basic,
};

export const Controlled: Story = {
    args: { active: 1 },
    render: Stories.Controlled,
};

export const Counter: Story = {
    args: { active: 1, onChange: undefined },
    render: Stories.Counter,
};

export const Draggable: Story = {
    args: {
        draggable: true,
        onTabPositionChange: undefined,
    },
    render: Stories.Draggable,
};

export const Scroll: Story = {
    args: { active: 1, onChange: undefined },
    render: Stories.Scroll,
};

export const TabHeader: Story = {
    args: { active: 1 },
    render: Stories.TH,
};
