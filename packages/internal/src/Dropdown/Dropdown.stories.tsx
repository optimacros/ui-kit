import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Dropdown, Button, Menu, MenuItem, SubMenu } from '@optimacros-ui/kit-internal';
import { Flex } from '@optimacros-ui/flex';
import { useCallback, useRef, useSyncExternalStore } from 'react';

const defaultFocusHistory = [document.activeElement];

const useFocusHistory = ({
    maxHistoryItems = 15,
    formatBeforeSave,
}: {
    maxHistoryItems?: number;
    formatBeforeSave?: (element: Element | null) => Element | null;
}) => {
    const historyRef = useRef<Array<Element | null>>(defaultFocusHistory);
    const getSnapshot = useCallback(() => historyRef.current, []);
    const subscribe = useCallback((onChange: () => void) => {
        const controller = new AbortController();

        const { signal } = controller;

        const trackFocus = (event: FocusEvent) => {
            const { target } = event;
            const history = historyRef.current;
            const prevFocusedElement = history[0];
            const { activeElement } = document;

            if (prevFocusedElement !== activeElement) {
                const focusedElement = (() => {
                    const gridContainer = formatBeforeSave
                        ? formatBeforeSave(target as Element | null)
                        : activeElement;

                    return gridContainer ?? activeElement;
                })();
                //@ts-ignore
                focusedElement.focus();
                historyRef.current.unshift(focusedElement);
                historyRef.current = historyRef.current.slice(0, maxHistoryItems);
                onChange();
            }
        };
        const listenerParams = { signal, capture: true };

        document.body.addEventListener('focus', trackFocus, listenerParams);

        return () => {
            historyRef.current = [];
            controller.abort();
        };
    }, []);

    const focusHistory = useSyncExternalStore(subscribe, getSnapshot);

    return focusHistory;
};

const argTypes: Partial<ArgTypes> = {
    disabled: {
        control: 'boolean',
        description: 'If `true`, component will be disabled.',
    },
    closeOnSelect: {
        control: 'boolean',
        description: 'If `true`, overlay close after select.',
    },
    overlayStyle: {
        control: 'object',
        description: 'Overlay styles.',
    },
    minOverlayWidthMatchTrigger: {
        control: 'boolean',
        description: 'Whether overlay"s width must not be less than trigger"s.',
    },
    arrow: {
        control: 'boolean',
    },
    alignPoint: {
        control: 'boolean',
        description:
            'Popup will align with mouse position (support action of `click`, `hover` and `contextMenu`)',
    },
    visible: {
        control: 'boolean',
        description: 'If `true`, overlay will be visible by default. ',
    },
    trigger: {
        control: 'radio',
        options: ['click', 'hover', 'contextMenu', 'focus'],
        table: {
            defaultValue: { summary: 'hover' },
        },
        description: 'Which actions cause popup shown.',
    },
    showAction: {
        control: 'radio',
        options: ['click', 'hover', 'contextMenu', 'focus'],
        table: {
            defaultValue: { summary: 'hover' },
        },
        description: 'Which actions cause popup shown.',
    },
    hideAction: {
        control: 'radio',
        options: ['click', 'hover', 'contextMenu', 'focus'],
        table: {
            defaultValue: { summary: 'hover' },
        },
        description: 'Which actions cause popup hide.',
    },
    mouseEnterDelay: {
        control: 'number',
        description: 'Delay time to show when mouse enter. Unit: s.',
    },
    mouseLeaveDelay: {
        control: 'number',
        description: 'Delay time to hide when mouse leave. Unit: s.',
    },
    overlay: {
        table: { disable: true },
    },
    className: {
        table: { disable: true },
    },
    overlayClassName: {
        table: { disable: true },
    },
    openClassName: {
        table: { disable: true },
    },
    prefixCls: {
        table: { disable: true },
    },
    transitionName: {
        table: { disable: true },
    },
    autoFocus: {
        table: { disable: true },
    },
    children: {
        table: { disable: true },
    },
    onVisibleChange: {
        table: { disable: true },
    },
    onOverlayClick: {
        table: { disable: true },
    },
    autoDestroy: {
        table: { disable: true },
    },
    animation: {
        table: { disable: true },
    },
    align: {
        table: { disable: true },
    },
    placement: {
        table: { disable: true },
    },
    placements: {
        table: { disable: true },
    },
    builtinPlacements: {
        table: { disable: true },
    },
    getPopupContainer: {
        table: { disable: true },
    },
    onPopupAlign: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Dropdown> = {
    title: 'UI KIT internal/Dropdown',
    // @ts-ignore
    component: Dropdown,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [
        (Story) => {
            return (
                <Flex height="200px">
                    <Story />
                </Flex>
            );
        },
    ],
    args: {
        controllable: true,
    },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const OverlayComponent = () => {
    return (
        <div>
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
        </div>
    );
};

export const Basic: Story = {
    args: {
        children: <Button label="Users" />,
        closeOnSelect: true,
        overlay: <OverlayComponent />,
        trigger: ['hover'],
    },
};

export const TriggerClick: Story = {
    args: {
        trigger: ['click'],
        children: <Button label="Users" />,
        renderOverlay: (props) => (
            <Menu {...props}>
                <MenuItem>1</MenuItem>
                <SubMenu title="2">
                    <MenuItem>2-1</MenuItem>
                    <SubMenu title="3">
                        <MenuItem>3-1</MenuItem>
                        <SubMenu title="4">
                            <MenuItem>4-1</MenuItem>
                            <MenuItem>4-2</MenuItem>
                            <MenuItem>4-3</MenuItem>
                            <MenuItem>4-4</MenuItem>
                            <SubMenu title="5">
                                <MenuItem>5-1</MenuItem>
                                <MenuItem>5-2</MenuItem>
                                <SubMenu title="6">
                                    <MenuItem>6-1</MenuItem>
                                    <MenuItem>6-2</MenuItem>
                                    <SubMenu title="7">
                                        <MenuItem>7-1</MenuItem>
                                        <MenuItem>7-2</MenuItem>
                                        <MenuItem>7-3</MenuItem>
                                        <MenuItem>7-4</MenuItem>
                                    </SubMenu>
                                    <MenuItem>6-3</MenuItem>
                                    <MenuItem>6-4</MenuItem>
                                </SubMenu>
                                <MenuItem>5-3</MenuItem>
                                <MenuItem>5-4</MenuItem>
                            </SubMenu>
                        </SubMenu>
                    </SubMenu>
                </SubMenu>
            </Menu>
        ),
    },
};

export const Disabled: Story = {
    args: {
        children: <Button label="Users" />,
        overlay: <OverlayComponent />,
        disabled: true,
    },
};

export const LoopingFocus = (args) => {
    useFocusHistory({
        formatBeforeSave(element: Element | null) {
            return document?.querySelector('.infinite_focus') ?? null;
        },
    });

    return (
        <>
            {/* @ts-ignore*/}
            <Dropdown {...TriggerClick.args} />
            <Button className="infinite_focus">infinite focus button</Button>
        </>
    );
};
