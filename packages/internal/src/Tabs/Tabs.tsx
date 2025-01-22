import { memo, ReactElement, useEffect, useMemo } from 'react';

import { Tabs as UITabs } from '@optimacros-ui/tabs';
import { TabProps, TabsTheme } from './models';
import { Flex } from '@optimacros-ui/flex';
import { TabButton } from './TabButton';

interface TabsContentProps extends Omit<TabsProps, 'theme' | 'className'> {
    theme: Partial<TabsTheme>;
}

const Content = memo(({ className, tabs }) => {
    return (
        <Flex className={className}>
            {tabs.map((tab) => (
                <UITabs.Content value={tab.value} key={tab.value}>
                    {tab.children}
                </UITabs.Content>
            ))}
        </Flex>
    );
});

Content.displayName = 'Content';

const TabsContent = memo<TabsContentProps>(({ children, active }) => {
    const tabs = UITabs.useProxySelector((api) => api.tabs);
    const setValue = UITabs.useProxySelector((api) => api.setValueIndex);
    const draggable = UITabs.useSelector((api) => api.draggable);
    const setTabs = UITabs.useSelector((api) => api.setTabs);

    useEffect(() => {
        setValue(active);
    }, [active]);

    const childrenArr = useMemo(() => {
        // sync tabs without setting em
        // how to map children without remapping props
        // no way to register
        const childrenArr = Array.isArray(children) ? children : [children];

        const tabArr = childrenArr.map((child, index) => {
            const titleString = typeof child.props.title === 'string' && child.props.title;

            return {
                value: titleString || index.toString(),
                index,
                ...child.props,
                title: titleString || undefined,
                fixed: child.props.isFixed,
            };
        });

        return tabArr;
    }, [children]);

    return (
        <>
            <UITabs.List>
                {/** remap children tabs */}
                {childrenArr.map((tab, index) => {
                    return !tab.nonDraggable && draggable ? (
                        <UITabs.DraggableTrigger {...tab} key={tab.value} fixed={tab.isFixed}>
                            <TabButton
                                value={tab.value}
                                icon={tab.icon}
                                onHeaderContextMenu={tab.onHeaderContextMenu}
                                onDoubleClick={tab.onDoubleClick}
                            />
                        </UITabs.DraggableTrigger>
                    ) : (
                        <UITabs.Trigger {...tab} key={tab.value} fixed={tab.isFixed}>
                            <TabButton
                                value={tab.value}
                                icon={tab.icon}
                                onHeaderContextMenu={tab.onHeaderContextMenu}
                                onDoubleClick={tab.onDoubleClick}
                            />
                        </UITabs.Trigger>
                    );
                })}
            </UITabs.List>

            <Flex>
                {childrenArr.map((tab) => (
                    <UITabs.Content value={tab.value} key={tab.value}>
                        {tab.children}
                    </UITabs.Content>
                ))}
            </Flex>
        </>
    );
});
TabsContent.displayName = 'TabsContent';

export interface TabsProps {
    className?: string;
    draggable?: boolean;
    onTabSwitch?: (index: number) => void;
    onTabPositionChange?: (newTabs: TabProps[]) => void;
    hideTabHeader?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    theme?: Partial<TabsTheme>;
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    active?: number;
    onChange?: (index: number) => void;
}

export const Tabs = memo<TabsProps>(
    ({ className, theme = {}, onTabPositionChange, draggable, active, ...rest }) => {
        return (
            <UITabs.Root
                activationMode="manual"
                className={className}
                //active value as index
                onValueChange={(d) => {
                    rest.onTabSwitch(UITabs.getTabIndex(d.value));
                    rest.onChange(UITabs.getTabIndex(d.value));
                }}
                onPositionChange={onTabPositionChange}
                tabsHidden={rest.hideTabHeader}
                useWheel
                draggable={draggable}
            >
                <TabsContent {...rest} theme={theme} active={active} />
            </UITabs.Root>
        );
    },
);
Tabs.displayName = 'Tabs';

export const TabHeader = Tabs;
