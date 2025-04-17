import { Button } from '@optimacros-ui/button';
import { Menu } from '..';
import { Props } from '../menu.machine';
import { menuItems } from '../mock';
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

export const LoopingFocus = (props: Props) => {
    useFocusHistory({
        formatBeforeSave(element: Element | null) {
            return document?.querySelector('.infinite_focus') ?? null;
        },
    });

    return (
        <>
            <Menu.Root {...props}>
                <Menu.Trigger asChild>
                    <Button data-testid="trigger">Click me</Button>
                </Menu.Trigger>
                <Menu.Positioner>
                    <Menu.Content size="sm" data-testid="menu-content">
                        <Menu.List data-testid="menu-list">
                            {menuItems.map((v) => (
                                <Menu.Item key={v.value} {...v}>
                                    {v.valueText}
                                </Menu.Item>
                            ))}
                        </Menu.List>
                    </Menu.Content>
                </Menu.Positioner>
            </Menu.Root>
            <Button className="infinite_focus" variant="primary">
                I AM FOCUSED BUTTON
            </Button>
        </>
    );
};
